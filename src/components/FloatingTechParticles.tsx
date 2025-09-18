'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  icon: React.ReactElement;
  color: string;
  size: number;
}

const techIcons = [
  // Docker
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M11.06 11.078h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H11.06a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M8.136 11.078h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H8.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185"/>
  </svg>,
  
  // Kubernetes
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 002.075.652l-.63-2.56a.595.595 0 00-.453-.515m3.592 0a.594.594 0 00-.452.515l-.63 2.56a5.171 5.171 0 002.075-.652l-.993-2.423zM12 13.911a.605.605 0 00.546-.344l1.198-2.402a5.202 5.202 0 00-3.488 0l1.198 2.402c.094.188.282.344.546.344"/>
  </svg>,
  
  // CI/CD Pipeline
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>,
  
  // Cloud
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
  </svg>,
  
  // Server/Infrastructure
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 1h16a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1zm0 8h16a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4a1 1 0 011-1zm0 8h16a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4a1 1 0 011-1z"/>
  </svg>,
  
  // Git/Version Control
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>,
  
  // Terraform
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 4.5l5.25 3.03v6.06L1.5 10.56V4.5zm6.75 0L13.5 7.53v6.06L8.25 10.56V4.5zm7.5 3.03L21 10.56v6.06l-5.25-3.03V7.53zM8.25 12.47l5.25 3.03v6.06L8.25 18.53v-6.06z"/>
  </svg>,
  
  // Monitoring/Analytics
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
  </svg>,
];

const colors = [
  '#E07A5F', '#81B29A', '#60A5FA', '#A78BFA', '#34D399', 
  '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#10B981'
];

export default function FloatingTechParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Initialize particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 12; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * (window.innerWidth - 100) + 50,
        y: Math.random() * (window.innerHeight - 100) + 50,
        vx: (Math.random() - 0.5) * 1, // Slightly faster movement
        vy: (Math.random() - 0.5) * 1,
        icon: techIcons[Math.floor(Math.random() * techIcons.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 16 + 32, // 32-48px (much larger)
      });
    }
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          let newVx = particle.vx;
          let newVy = particle.vy;

          // Bounce off edges like DVD screensaver
          if (newX <= 0 || newX >= window.innerWidth - particle.size) {
            newVx = -newVx; // Reverse horizontal direction
            newX = newX <= 0 ? 0 : window.innerWidth - particle.size;
          }
          if (newY <= 0 || newY >= window.innerHeight - particle.size) {
            newVy = -newVy; // Reverse vertical direction
            newY = newY <= 0 ? 0 : window.innerHeight - particle.size;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 16); // ~60fps
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