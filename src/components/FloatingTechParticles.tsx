'use client';

import React, { useEffect, useState } from 'react';
import { 
  Cloud, 
  Server, 
  Shield, 
  Code, 
  Monitor, 
  Settings,
  GitBranch,
  Workflow,
  BrainCircuit,
  CloudCheck,
  Container,
  GitFork,
  Network,
  Rocket,
  Puzzle,
  Database
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  icon: React.ReactElement;
  color: string;
  size: number;
}

const techIcons = [
  // Lucide icons matching your skills
  <Cloud className="w-full h-full" />,
  <Server className="w-full h-full" />, 
  <Shield className="w-full h-full" />,
  <Code className="w-full h-full" />,
  <Monitor className="w-full h-full" />,
  <Settings className="w-full h-full" />,
  <GitBranch className="w-full h-full" />,
  <Workflow className="w-full h-full" />,
  <BrainCircuit className="w-full h-full" />,
  <CloudCheck className="w-full h-full" />,
  <Container className="w-full h-full" />,
  <GitFork className="w-full h-full" />,
  <Network className="w-full h-full" />,
  <Rocket className="w-full h-full" />,
  <Puzzle className="w-full h-full" />,
  <Database className="w-full h-full" />,
  
  // Docker brand icon
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.924 0h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H11.06a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.924 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H8.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.185-.185V9.006a.186.185 0 00-.185-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185"/>
  </svg>,
  
  // GitHub brand icon  
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
];

const colors = [
  '#E07A5F', '#81B29A', '#60A5FA', '#A78BFA', '#34D399', 
  '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#10B981',
  '#F97316', '#EC4899', '#6366F1', '#14B8A6', '#84CC16',
  '#F43F5E', '#8B5A2B'
];

// Seeded random number generator for consistent but varied results
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function FloatingTechParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create particles that show ALL icons with gentle floating positions
    const initialParticles: Particle[] = [];
    
    // Use all 18 icons (16 Lucide + 2 brand icons)
    for (let i = 0; i < techIcons.length; i++) {
      // Spread icons across the screen in a more random distribution
      const x = 50 + seededRandom(i * 3.7) * (window.innerWidth - 150);
      const y = 50 + seededRandom(i * 5.3) * (window.innerHeight - 150);
      
      initialParticles.push({
        id: i,
        x: x,
        y: y,
        icon: techIcons[i], // Each icon appears exactly once
        color: colors[i % colors.length], // Cycle through colors deterministically
        size: 48 + (i % 4) * 4, // Vary size: 48px, 52px, 56px, 60px
      });
    }
    
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Gentle floating movement with slight random variation
          const time = Date.now() * 0.001; // Current time in seconds
          const floatX = Math.sin(time * 0.5 + particle.id * 1.7) * 0.3;
          const floatY = Math.cos(time * 0.3 + particle.id * 2.1) * 0.4;
          
          return {
            ...particle,
            x: particle.x + floatX,
            y: particle.y + floatY,
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 32); // ~30fps for smoother floating
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute transition-opacity duration-1000"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            color: `${particle.color}60`, // 40% opacity (more visible)
            transform: 'translate(0, 0)', // Remove centering transform
          }}
        >
          {particle.icon}
        </div>
      ))}
    </div>
  );
}