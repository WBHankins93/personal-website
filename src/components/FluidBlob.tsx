'use client';

import { useEffect, useRef } from 'react';

export default function FluidBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dynamically import Three.js to avoid SSR
    import('three').then((THREE) => {
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 4.5;

      // Outer wireframe blob
      const blobGeo = new THREE.SphereGeometry(1.6, 128, 128);
      const blobMat = new THREE.MeshBasicMaterial({
        color: 0x00FF41,
        wireframe: true,
        transparent: true,
        opacity: 0.04,
      });
      const blob = new THREE.Mesh(blobGeo, blobMat);
      scene.add(blob);

      // Inner solid blob for depth
      const innerGeo = new THREE.SphereGeometry(1.55, 64, 64);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x00FF41,
        transparent: true,
        opacity: 0.012,
      });
      const inner = new THREE.Mesh(innerGeo, innerMat);
      scene.add(inner);

      // Store original vertex positions
      const origPositions = new Float32Array(blobGeo.attributes.position.array);
      const origInner = new Float32Array(innerGeo.attributes.position.array);

      // Floating particles
      const pCount = 80;
      const pPos = new Float32Array(pCount * 3);
      const pVel: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 10;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
        pVel.push({
          x: (Math.random() - 0.5) * 0.006,
          y: (Math.random() - 0.5) * 0.006,
          z: (Math.random() - 0.5) * 0.004,
        });
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x00FF41,
        size: 0.08,
        transparent: true,
        opacity: 0.3,
      });
      scene.add(new THREE.Points(pGeo, pMat));

      let scrollY = 0;
      let mouseNX = 0;
      let mouseNY = 0;
      let animationId: number;

      const onScroll = () => { scrollY = window.scrollY; };
      const onMouseMove = (e: MouseEvent) => {
        mouseNX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseNY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      window.addEventListener('scroll', onScroll);
      document.addEventListener('mousemove', onMouseMove);

      function animate() {
        animationId = requestAnimationFrame(animate);
        const t = Date.now() * 0.0005;

        // Morph outer blob vertices
        const pos = blobGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < pos.length; i += 3) {
          const ox = origPositions[i], oy = origPositions[i + 1], oz = origPositions[i + 2];
          const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
          const nx = ox / len, ny = oy / len, nz = oz / len;
          const d1 = Math.sin(nx * 3 + t * 1.2) * Math.cos(ny * 4 + t * 0.8) * 0.12;
          const d2 = Math.sin(nz * 5 + t * 1.5) * Math.cos(nx * 2 - t) * 0.08;
          const d3 = Math.sin(ny * 6 - t * 2) * Math.sin(nz * 3 + t * 0.6) * 0.05;
          const scale = 1 + d1 + d2 + d3;
          pos[i] = ox * scale;
          pos[i + 1] = oy * scale;
          pos[i + 2] = oz * scale;
        }
        blobGeo.attributes.position.needsUpdate = true;

        // Morph inner blob
        const ipos = innerGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < ipos.length; i += 3) {
          const ox = origInner[i], oy = origInner[i + 1], oz = origInner[i + 2];
          const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
          const nx = ox / len, ny = oy / len, nz = oz / len;
          const d = Math.sin(nx * 4 + t * 1.4) * Math.cos(ny * 3 + t) * 0.1 + Math.sin(nz * 5 - t * 1.8) * 0.06;
          const s = 1 + d;
          ipos[i] = ox * s;
          ipos[i + 1] = oy * s;
          ipos[i + 2] = oz * s;
        }
        innerGeo.attributes.position.needsUpdate = true;

        blob.rotation.x = t * 0.3 + scrollY * 0.0002;
        blob.rotation.y = t * 0.2 + mouseNX * 0.15;
        inner.rotation.x = -t * 0.2;
        inner.rotation.y = -t * 0.15 + mouseNX * 0.1;

        // Mouse position influence
        blob.position.x += (mouseNX * 0.3 - blob.position.x) * 0.02;
        blob.position.y += (-mouseNY * 0.3 - blob.position.y) * 0.02;
        inner.position.x = blob.position.x * 0.8;
        inner.position.y = blob.position.y * 0.8;

        // Particles
        const pp = pGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < pCount; i++) {
          pp[i * 3] += pVel[i].x;
          pp[i * 3 + 1] += pVel[i].y;
          pp[i * 3 + 2] += pVel[i].z;
          if (Math.abs(pp[i * 3]) > 5) pVel[i].x *= -1;
          if (Math.abs(pp[i * 3 + 1]) > 5) pVel[i].y *= -1;
          if (Math.abs(pp[i * 3 + 2]) > 3) pVel[i].z *= -1;
        }
        pGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      }
      animate();

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      // Cleanup
      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('mousemove', onMouseMove);
        renderer.dispose();
        blobGeo.dispose();
        blobMat.dispose();
        innerGeo.dispose();
        innerMat.dispose();
        pGeo.dispose();
        pMat.dispose();
      };
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
