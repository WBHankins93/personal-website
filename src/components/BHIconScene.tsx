'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SceneContent } from './bh-icon';

export default function BHIconScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Suspense fallback={null}>
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          camera={{ position: [12, 10, 12], fov: 35 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
}

