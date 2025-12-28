
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
}

const COLORS = ['#d4af37', '#c51f28', '#f7f4e9', '#ffffff'];

export const Fireworks: React.FC = () => {
  const [bursts, setBursts] = useState<Particle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBurst = {
        id: Date.now(),
        x: Math.random() * 80 + 10, // 10% to 90%
        y: Math.random() * 50 + 10, // 10% to 60%
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 2
      };
      
      setBursts(prev => [...prev.slice(-8), newBurst]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {bursts.map(burst => (
        <div 
          key={burst.id} 
          className="absolute" 
          style={{ left: `${burst.x}%`, top: `${burst.y}%` }}
        >
            {/* The burst particles */}
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="firework-particle"
                    style={{
                        '--color': burst.color,
                        animation: `firework-burst 1.5s ease-out forwards`,
                        transform: `rotate(${i * 30}deg) translateY(-20px)`,
                        transformOrigin: 'center'
                    } as any}
                />
            ))}
            
            {/* The glow */}
            <div 
                className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: burst.color, animation: 'twinkle 1.5s ease-out forwards' }}
            />
        </div>
      ))}
    </div>
  );
};
