'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const words = ['CI/CD', 'Kubernetes', 'Terraform', 'SRE', 'DevOps', 'Docker', 'Monitoring', 'GitHub Actions', 'Cloud', 'Automation'];

function Word({ children, position }: { children: string, position: [number, number, number] }) {
  return (
    <Text position={position} fontSize={0.5} color="#ffffff">
      {children}
    </Text>
  );
}

function Scene() {
  const radius = 3;
  const wordCount = words.length;

  const wordPositions = words.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i) / wordCount);
    const theta = Math.sqrt(wordCount * Math.PI) * phi;
    return [
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi),
    ] as [number, number, number];
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      {words.map((word, i) => (
        <Word key={i} position={wordPositions[i]}>
          {word}
        </Word>
      ))}
    </>
  );
}

export default function WordSphere() {
  return (
    <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 0, 10], fov: 75 }}>
      <Scene />
    </Canvas>
  );
}
