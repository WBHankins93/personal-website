'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const words = [
  'CI/CD', 'Kubernetes', 'Terraform', 'SRE', 'DevOps', 
  'Docker', 'Monitoring', 'GitHub Actions', 'AWS', 'Automation',
  'Python', 'Go', 'OpenShift', 'Helm', 'Prometheus'
];

function Word({ 
  children, 
  position, 
  color = "#ffffff" 
}: { 
  children: string; 
  position: [number, number, number]; 
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      // Gentle floating animation
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
      // Gentle rotation
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.3}
      color={color}
      anchorX="center"
      anchorY="middle"
      maxWidth={200}
      lineHeight={1}
      letterSpacing={0.02}
      font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff"
    >
      {children}
    </Text>
  );
}

function WordSphereScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const radius = 4;
  const wordCount = words.length;

  const wordPositions = useMemo(() => {
    return words.map((_, i) => {
      // Better sphere distribution using Fibonacci spiral
      const phi = Math.acos(1 - 2 * (i + 0.5) / wordCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ] as [number, number, number];
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation of the entire sphere
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      
      {words.map((word, i) => (
        <Word 
          key={`${word}-${i}`} 
          position={wordPositions[i]}
          color={
            i % 4 === 0 ? "#E07A5F" : 
            i % 4 === 1 ? "#81B29A" : 
            i % 4 === 2 ? "#60A5FA" : 
            "#ffffff"
          }
        >
          {word}
        </Word>
      ))}
    </group>
  );
}

export default function WordSphere() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Suspense fallback={null}>
        <Canvas 
          camera={{ 
            position: [0, 0, 8], 
            fov: 75 
          }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <WordSphereScene />
        </Canvas>
      </Suspense>
    </div>
  );
}