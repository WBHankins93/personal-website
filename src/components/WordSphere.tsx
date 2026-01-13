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
  initialPosition,
  index,
  color = "#ffffff" 
}: { 
  children: string; 
  initialPosition: [number, number, number];
  index: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      // Floating animation similar to FloatingTechParticles
      const floatX = Math.sin(time * 0.5 + index * 1.7) * 0.4;
      const floatY = Math.cos(time * 0.3 + index * 2.1) * 0.5;
      
      ref.current.position.x = initialPosition[0] + floatX;
      ref.current.position.y = initialPosition[1] + floatY;
      ref.current.position.z = initialPosition[2];
      
      // Gentle rotation for visual interest
      ref.current.rotation.z = Math.sin(time * 0.2 + index) * 0.1;
    }
  });

  return (
    <Text
      ref={ref}
      position={initialPosition}
      fontSize={0.4}
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

// Seeded random function for consistent positioning
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function WordSphereScene() {
  const wordCount = words.length;

  const wordPositions = useMemo(() => {
    // Distribute words across the 3D space in a more scattered pattern
    // Using a wider area similar to FloatingTechParticles but in 3D
    return words.map((_, i) => {
      // Spread words across the viewport in 2D-like distribution but with slight Z variation
      const spreadX = 8; // Width of distribution
      const spreadY = 6; // Height of distribution
      const spreadZ = 2; // Depth variation
      
      const x = (seededRandom(i * 3.7) - 0.5) * spreadX;
      const y = (seededRandom(i * 5.3) - 0.5) * spreadY;
      const z = (seededRandom(i * 7.1) - 0.5) * spreadZ;
      
      return [x, y, z] as [number, number, number];
    });
  }, [wordCount]);

  return (
    <group>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      
      {words.map((word, i) => (
        <Word 
          key={`${word}-${i}`} 
          initialPosition={wordPositions[i]}
          index={i}
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