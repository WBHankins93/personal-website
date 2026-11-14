"use client";

// Hero, Tier 2 (handoff 7.1): the same bayou as eight flat layers at
// increasing depth, drawn with Three.js over the Tier 1 SVG. Loaded with
// next/dynamic, desktop only, and only when WebGL works and reduced motion
// is off. Hero.tsx decides all of that and falls back to Tier 1 whenever
// this component calls onFail.
//
// 2.5D, not 3D: every layer is one textured plane. No meshes, no downloads.
// One uniform, uReveal, is shared by all layers. The fragment shader draws
// the line texture on one side of the diagonal and the painted texture on
// the other, using the same geometry as the CSS clip-path in hero.css.
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { CanvasTexture, LinearFilter, NoColorSpace, PerspectiveCamera, PlaneGeometry, ShaderMaterial, Vector2, type Mesh } from "three";
import { buildLayerTextures, SCENE_H, SCENE_W, type LayerTextures } from "./layers";

/** Camera distance from the foreground plane, in CSS px. */
const CAMERA_Z = 1000;
/** How far the pointer can move the camera. Kept subtle. */
const DRIFT_X = 14;
const DRIFT_Y = 5;
/** Scene units of clamped overscan on each side, so parallax never shows an edge. */
const MARGIN = 80;
/** Fall back to Tier 1 when the frame rate holds below this for FPS_WINDOW ms. */
const FPS_FLOOR = 40;
const FPS_WINDOW = 2000;
const FPS_GRACE = 1500;

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;
  uniform sampler2D uPaint;
  uniform sampler2D uLine;
  uniform float uHasLine;
  uniform float uReveal;
  uniform float uTime;
  uniform float uSway;
  uniform float uShimmer;
  uniform vec2 uRes;
  uniform vec4 uCrop;
  varying vec2 vUv;

  void main() {
    // Same diagonal as the clip-path in hero.css: x is the crossing at
    // mid-height, the lean is 11% of the width at mid-sweep and zero at
    // both ends.
    vec2 frag = gl_FragCoord.xy / uRes;
    float lean = 0.11 * sin(3.14159265 * uReveal);
    float lineX = uReveal + lean * (2.0 * frag.y - 1.0);
    // 0 on the schematic side, 1 on the painted side, one pixel of blend.
    float side = clamp((lineX - frag.x) * uRes.x + 0.5, 0.0, 1.0);

    vec2 scene = uCrop.xy + vec2(vUv.x, 1.0 - vUv.y) * uCrop.zw;
    vec2 uv = vUv;
    // Moss: a slow sideways drift that varies along the branch.
    uv.x += uSway * sin(uTime * 0.7 + scene.x * 0.021 + scene.y * 0.006) * (1.6 / uCrop.z);
    // Water: reflection bars slide a little, row by row.
    float row = floor(scene.y / 17.0);
    uv.x += uShimmer * step(540.0, scene.y) * sin(uTime * 1.1 + row * 2.3) * (2.6 / uCrop.z);

    vec4 color = vec4(0.0);
    if (side > 0.0) color += texture2D(uPaint, uv) * side;
    if (side < 1.0 && uHasLine > 0.5) color += texture2D(uLine, vUv) * (1.0 - side);
    if (color.a < 0.004) discard;
    gl_FragColor = color;
  }
`;

function toTexture(canvas: HTMLCanvasElement): CanvasTexture {
  const texture = new CanvasTexture(canvas);
  // Colors pass straight through so they match the DOM exactly.
  texture.colorSpace = NoColorSpace;
  texture.generateMipmaps = false;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.premultiplyAlpha = true;
  return texture;
}

interface SceneProps {
  layers: LayerTextures[];
  reveal: RefObject<number>;
  active: RefObject<boolean>;
  guard: boolean;
  onReady: () => void;
  onFail: (reason: string) => void;
}

function Layers({ layers, reveal, active, guard, onReady, onFail }: SceneProps) {
  const { size, camera, gl, invalidate } = useThree();
  const meshes = useRef<(Mesh | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const drift = useRef({ x: 0, y: 0 });
  const clock = useRef({ time: 0, last: 0, started: 0, windowStart: 0, frames: 0, lastReveal: -1, ready: false });

  const built = useMemo(
    () =>
      layers.map(({ spec, paint, line }) => {
        const crop = spec.crop ?? [0, 0, SCENE_W, SCENE_H];
        const full = !spec.crop;
        const margin = full ? MARGIN : 0;
        const geometry = new PlaneGeometry(crop[2] + margin * 2, crop[3] + margin * 2);
        // Stretch the UVs past 0..1 over the margin; clamp-to-edge repeats
        // the last pixel there, which is what flat poster art wants.
        const uv = geometry.attributes.uv;
        for (let i = 0; i < uv.count; i++) {
          uv.setXY(i, (uv.getX(i) - 0.5) * ((crop[2] + margin * 2) / crop[2]) + 0.5, (uv.getY(i) - 0.5) * ((crop[3] + margin * 2) / crop[3]) + 0.5);
        }
        const paintTexture = toTexture(paint);
        const lineTexture = line ? toTexture(line) : null;
        const material = new ShaderMaterial({
          vertexShader: VERTEX,
          fragmentShader: FRAGMENT,
          transparent: true,
          premultipliedAlpha: true,
          depthTest: false,
          depthWrite: false,
          uniforms: {
            uPaint: { value: paintTexture },
            uLine: { value: lineTexture ?? paintTexture },
            uHasLine: { value: lineTexture ? 1 : 0 },
            uReveal: { value: 0 },
            uTime: { value: 0 },
            uSway: { value: spec.motion === "sway" ? 1 : 0 },
            uShimmer: { value: spec.motion === "shimmer" ? 1 : 0 },
            uRes: { value: [1, 1] },
            uCrop: { value: crop },
          },
        });
        return { spec, crop, geometry, material, textures: [paintTexture, lineTexture] };
      }),
    [layers],
  );

  useEffect(
    () => () => {
      built.forEach((b) => {
        b.geometry.dispose();
        b.material.dispose();
        b.textures.forEach((t) => t?.dispose());
      });
    },
    [built],
  );

  // World units are CSS px at the foreground plane. Each layer sits `depth`
  // behind it and is scaled up by the same ratio, so at rest every layer
  // lands exactly where the Tier 1 SVG (xMidYMid slice) draws it.
  useEffect(() => {
    const cam = camera as PerspectiveCamera;
    cam.fov = (2 * Math.atan(size.height / 2 / CAMERA_Z) * 180) / Math.PI;
    cam.near = 10;
    cam.far = 20000;
    cam.position.z = CAMERA_Z;
    cam.updateProjectionMatrix();
    const cover = Math.max(size.width / SCENE_W, size.height / SCENE_H);
    built.forEach((b, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;
      const scale = cover * ((CAMERA_Z + b.spec.depth) / CAMERA_Z);
      const cx = b.crop[0] + b.crop[2] / 2 - SCENE_W / 2;
      const cy = SCENE_H / 2 - (b.crop[1] + b.crop[3] / 2);
      mesh.scale.setScalar(scale);
      mesh.position.set(cx * scale, cy * scale, -b.spec.depth);
      mesh.userData.rest = { x: cx * scale, y: cy * scale, scale };
    });
    invalidate();
  }, [built, camera, size, invalidate]);

  // Pointer parallax. Fine pointers only; the hero never reacts to scroll.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const box = gl.domElement.getBoundingClientRect();
      pointer.current.x = Math.min(1, Math.max(-1, ((e.clientX - box.left) / box.width) * 2 - 1));
      pointer.current.y = Math.min(1, Math.max(-1, ((e.clientY - box.top) / box.height) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  // A lost context cannot be drawn to again: hand back to Tier 1.
  useEffect(() => {
    const canvas = gl.domElement;
    const onLost = () => onFail("webgl context lost");
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [gl, onFail]);

  // Own the frame loop (the Canvas runs frameloop="demand"): full rate
  // while something is moving, half rate for idle motion, nothing at all
  // while the hero is off screen or the tab is hidden.
  useEffect(() => {
    let raf = 0;
    let tick = 0;
    const c = clock.current;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!active.current) {
        c.last = 0;
        c.windowStart = 0;
        return;
      }
      const delta = c.last ? now - c.last : 16;
      c.last = now;

      // Frame-rate guard (handoff 7.1): an average below 40fps across a
      // two-second window means this machine is better off with the SVG.
      if (guard && c.ready && now - c.started > FPS_GRACE) {
        if (!c.windowStart) {
          c.windowStart = now;
          c.frames = 0;
        }
        c.frames += 1;
        if (now - c.windowStart >= FPS_WINDOW) {
          const fps = (c.frames * 1000) / (now - c.windowStart);
          c.windowStart = 0;
          if (fps < FPS_FLOOR) {
            cancelAnimationFrame(raf);
            onFail(`frame rate held at ${Math.round(fps)}fps`);
            return;
          }
        }
      }

      const targetX = pointer.current.x * DRIFT_X;
      const targetY = -pointer.current.y * DRIFT_Y;
      const moving =
        Math.abs(targetX - drift.current.x) > 0.02 || Math.abs(targetY - drift.current.y) > 0.02 || reveal.current !== c.lastReveal;
      tick += 1;
      if (moving || tick % 2 === 0) {
        c.time += (moving ? delta : delta * 2) / 1000;
        invalidate();
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, guard, invalidate, onFail, reveal]);

  useFrame(({ gl: renderer }) => {
    const c = clock.current;
    drift.current.x += (pointer.current.x * DRIFT_X - drift.current.x) * 0.08;
    drift.current.y += (-pointer.current.y * DRIFT_Y - drift.current.y) * 0.08;
    camera.position.x = drift.current.x;
    camera.position.y = drift.current.y;
    c.lastReveal = reveal.current;

    const buffer = renderer.getDrawingBufferSize(SIZE);
    built.forEach((b, i) => {
      const u = b.material.uniforms;
      u.uReveal.value = reveal.current;
      u.uTime.value = c.time;
      u.uRes.value[0] = buffer.x;
      u.uRes.value[1] = buffer.y;

      // The egret shifts its weight now and then.
      if (b.spec.id === "egret") {
        const mesh = meshes.current[i];
        const rest = mesh?.userData.rest as { x: number; y: number; scale: number } | undefined;
        if (mesh && rest) {
          const beat = (c.time % 9) / 1.6;
          const lean = beat < 1 ? Math.sin(beat * Math.PI) : 0;
          mesh.rotation.z = lean * 0.035;
          mesh.position.x = rest.x - lean * 2.2 * rest.scale;
        }
      }
    });

    if (!c.ready) {
      c.ready = true;
      c.started = performance.now();
      // Two frames later the textures are on the GPU and on screen.
      requestAnimationFrame(() => requestAnimationFrame(onReady));
    }
  });

  return (
    <>
      {built.map((b, i) => (
        <mesh
          key={b.spec.id}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          geometry={b.geometry}
          material={b.material}
          renderOrder={i}
          frustumCulled={false}
        />
      ))}
    </>
  );
}

const SIZE = new Vector2();

/** WebGL context creation throws inside the Canvas. Catch it and fall back. */
class CanvasBoundary extends Component<{ onFail: (reason: string) => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    this.props.onFail(`canvas error: ${String(error)}`);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export interface BayouCanvasProps {
  /** The hero <section>. Its server-rendered SVG scenes are the art source. */
  hero: RefObject<HTMLElement | null>;
  /** Reveal position, 0 to 1, owned by Hero.tsx. */
  reveal: RefObject<number>;
  /** False disables the frame-rate fallback (the ?tier=2 review override). */
  guard: boolean;
  onReady: () => void;
  onFail: (reason: string) => void;
}

export default function BayouCanvas({ hero, reveal, guard, onReady, onFail }: BayouCanvasProps) {
  const [layers, setLayers] = useState<LayerTextures[] | null>(null);
  const active = useRef(true);

  // Rasterize the layers from the SVG already on the page. Done once, and
  // again only if the hero grows enough (30%) to make the textures soft.
  useEffect(() => {
    const el = hero.current;
    if (!el) return;
    let cancelled = false;
    let builtFor = 0;
    let timer = 0;
    const build = () => {
      const box = el.getBoundingClientRect();
      const cover = Math.max(box.width / SCENE_W, box.height / SCENE_H);
      if (cover <= builtFor * 1.3) return;
      builtFor = cover;
      buildLayerTextures(el, cover, Math.min(window.devicePixelRatio || 1, 2))
        .then((result) => !cancelled && setLayers(result))
        .catch((error: unknown) => !cancelled && onFail(`layer textures failed: ${String(error)}`));
    };
    build();
    const ro = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(build, 400);
    });
    ro.observe(el);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      ro.disconnect();
    };
  }, [hero, onFail]);

  // Stop drawing when the hero is off screen or the tab is hidden.
  useEffect(() => {
    const el = hero.current;
    if (!el) return;
    let inView = true;
    const sync = () => {
      active.current = inView && document.visibilityState === "visible";
    };
    const io = new IntersectionObserver((entries) => {
      inView = entries[entries.length - 1].isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [hero]);

  if (!layers) return null;

  return (
    <CanvasBoundary onFail={onFail}>
    <Canvas
      className="hero-canvas"
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
      frameloop="demand"
      dpr={[1, 2]}
      flat
      linear
      camera={{ fov: 45, near: 10, far: 20000, position: [0, 0, CAMERA_Z] }}
      gl={{ antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor("#06120f", 1)}
    >
      <Layers layers={layers} reveal={reveal} active={active} guard={guard} onReady={onReady} onFail={onFail} />
    </Canvas>
    </CanvasBoundary>
  );
}
