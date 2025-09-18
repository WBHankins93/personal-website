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

const techIcons: React.ReactElement[] = [
    // Docker
    <svg key="docker" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119..."/>
    </svg>,
  
    // Kubernetes
    <svg key="kubernetes" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.204 14.35l.007.01-..."/>
    </svg>,
  
    // CI/CD Pipeline
    <svg key="cicd" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27..."/>
    </svg>,
  
    // Cloud
    <svg key="cloud" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04A7.49 7.49 0 0012 4..."/>
    </svg>,
  
    // Server/Infrastructure
    <svg key="server" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 1h16a1 1 0 011 1v4a1 1 0 01-1 1H4..."/>
    </svg>,
  
    // Git/Version Control
    <svg key="git" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12..."/>
    </svg>,
  
    // Terraform
    <svg key="terraform" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 4.5l5.25 3.03v6.06..."/>
    </svg>,
  
    // Monitoring/Analytics
    <svg key="monitoring" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59..."/>
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