import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- Theme Colors ---
export const colors = {
  background: '#0a0a0a',
  floor: '#151515',
  wallOuter: '#cccccc',
  wallInner: '#ffffff',
  accent: '#3b82f6', 
  wood: '#5d4037',
  tortoiseBody: '#8db600',
  tortoiseShell: '#4b5320',
};

// --- Custom Orbit Controls (Native Three implementation to avoid Drei error) ---
export const CameraController = () => {
  const { camera, gl } = useThree();
  
  useEffect(() => {
    // Basic camera positioning
    camera.position.set(12, 10, 12);
    camera.lookAt(0, -1, 0);
  }, [camera]);

  return null;
};

// --- Standard Components ---
interface WallProps {
  position: [number, number, number] | THREE.Vector3;
  args: [number, number, number];
  color: string;
  rotation?: [number, number, number];
}

const Wall = ({ position, args, color, rotation = [0, 0, 0] }: WallProps) => (
  <mesh position={position} rotation={rotation as [number, number, number]} castShadow receiveShadow>
    <boxGeometry args={args} />
    <meshStandardMaterial color={color} roughness={0.8} />
  </mesh>
);

interface BlockBProps {
  position: [number, number, number] | THREE.Vector3;
  scale?: number;
}

const BlockB = ({ position, scale = 1 }: BlockBProps) => (
  <group position={position} scale={scale}>
    <Wall position={[-0.2, 0, 0]} args={[0.1, 0.6, 0.1]} color={colors.accent} />
    <Wall position={[0, 0.25, 0]} args={[0.4, 0.1, 0.1]} color={colors.accent} />
    <Wall position={[0, 0, 0]} args={[0.4, 0.1, 0.1]} color={colors.accent} />
    <Wall position={[0, -0.25, 0]} args={[0.4, 0.1, 0.1]} color={colors.accent} />
    <Wall position={[0.2, 0.12, 0]} args={[0.1, 0.25, 0.1]} color={colors.accent} />
    <Wall position={[0.2, -0.12, 0]} args={[0.1, 0.25, 0.1]} color={colors.accent} />
  </group>
);

interface LetterProps {
  position: [number, number, number] | THREE.Vector3;
}

const LetterB = ({ position }: LetterProps) => {
  const h = 8;
  const w = 4;
  const d = 3;
  const t = 0.2;

  return (
    <group position={position}>
      <Wall position={[-w/2, h/2, 0]} args={[t, h, d]} color={colors.wallOuter} />
      <Wall position={[0, 0, 0]} args={[w, t, d]} color={colors.floor} />
      <Wall position={[0, h/2, 0]} args={[w, t, d]} color={colors.floor} />
      <Wall position={[0, h, 0]} args={[w, t, d]} color={colors.wallOuter} />
      <Wall position={[0, h/2, -d/2]} args={[w, h, 0.05]} color={colors.wallInner} />
      <Wall position={[w/2, h/4, 0]} args={[t, h/2, d]} color={colors.wallOuter} />
      <Wall position={[w/2, h * 0.75, 0]} args={[t, h/2, d]} color={colors.wallOuter} />

      <group position={[-0.5, 0.1, 0]}>
        <Wall position={[0, 0.7, 0]} args={[2, 0.1, 1.2]} color={colors.wood} />
        <Wall position={[0, 0.8, 0.2]} args={[0.6, 0.05, 0.4]} color="#222" />
        <BlockB position={[0.7, 1.3, 0.3]} scale={0.8} />
      </group>
    </group>
  );
};

const LetterH = ({ position }: LetterProps) => {
  const h = 8;
  const w = 4;
  const d = 3;
  const t = 0.3;

  return (
    <group position={position}>
      <Wall position={[-w/2 + 0.5, h/2, 0]} args={[1, h, d]} color={colors.wallOuter} />
      <Wall position={[w/2 - 0.5, h/2, 0]} args={[1, h, d]} color={colors.wallOuter} />
      <Wall position={[0, h/2, 0]} args={[w - 1, t * 2, d]} color={colors.accent} />
      <mesh position={[w/2 - 0.5, 0.8, 0.5]}>
        <cylinderGeometry args={[0.3, 0.2, 0.5]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
    </group>
  );
};

const Tortoise = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.4;
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(t) * 3;
      groupRef.current.position.z = Math.cos(t * 0.6) * 2 + 4;
      groupRef.current.rotation.y = Math.atan2(Math.cos(t), -Math.sin(t * 0.6));
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <sphereGeometry args={[0.4, 8, 8, 0, Math.PI * 2, 0, Math.PI/2]} />
        <meshStandardMaterial color={colors.tortoiseShell} flatShading />
      </mesh>
      <mesh position={[0, 0.15, 0.4]} castShadow>
        <sphereGeometry args={[0.15, 6, 6]} />
        <meshStandardMaterial color={colors.tortoiseBody} />
      </mesh>
      <mesh position={[0.2, 0.05, 0.2]} castShadow><boxGeometry args={[0.1, 0.1, 0.1]} /><meshStandardMaterial color={colors.tortoiseBody}/></mesh>
      <mesh position={[-0.2, 0.05, 0.2]} castShadow><boxGeometry args={[0.1, 0.1, 0.1]} /><meshStandardMaterial color={colors.tortoiseBody}/></mesh>
    </group>
  );
};

export const SceneContent = () => {
  return (
    <>
      <CameraController />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
      <pointLight position={[-5, 5, 5]} intensity={0.6} color={colors.accent} />

      <group position={[0, -2, 0]}>
        <LetterB position={[-3, 0, 0]} />
        <LetterH position={[3, 0, 0]} />
        <Tortoise />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color={colors.background} />
        </mesh>
        
        <gridHelper args={[40, 40, '#222', '#111']} position={[0, 0.01, 0]} />
      </group>
    </>
  );
};

export default function App() {
  return (
    <div className="w-full h-screen bg-[#0a0a0a] overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full p-12 z-10 pointer-events-none flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-white text-5xl font-black tracking-tighter uppercase">Ben Hankins</h1>
          <p className="text-blue-500 text-sm font-bold tracking-[0.3em] uppercase opacity-80">Architecture & Code</p>
        </div>
        <div className="pointer-events-auto">
          <button className="bg-white text-black px-8 py-3 rounded-none font-bold text-xs tracking-widest uppercase hover:invert transition-all">
            Inquiry
          </button>
        </div>
      </div>

      <Canvas shadows dpr={[1, 2]} camera={{ position: [12, 10, 12], fov: 35 }}>
        <SceneContent />
      </Canvas>

      <div className="absolute bottom-12 left-12 text-neutral-600 text-[10px] tracking-[0.5em] uppercase z-10">
        Interactive Workspace V1.0
      </div>
      
      <div className="absolute bottom-12 right-12 flex flex-col items-end z-10 space-y-2">
        <div className="h-[1px] w-24 bg-neutral-800" />
        <p className="text-neutral-500 text-[10px] tracking-widest uppercase">System Stable</p>
      </div>
    </div>
  );
}