
import React, { useRef, useEffect, useState } from 'react';
import { ScratchCardProps } from '../types';

const ScratchCard: React.FC<ScratchCardProps> = ({ width, height, isRevealed, onReveal, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPosition = useRef<{ x: number, y: number } | null>(null);
  const strokeCount = useRef(0);
  const hasMovedInStroke = useRef(false);
  const [glowPos, setGlowPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // 1. Solid Premium Base
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Diamond Watermark Pattern (Silver)
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = '#C0C0C0';
    const patternSize = 40;
    for (let x = 0; x < width + patternSize; x += patternSize) {
      for (let y = 0; y < height + patternSize; y += patternSize) {
        ctx.beginPath();
        ctx.moveTo(x + patternSize / 2, y);
        ctx.lineTo(x + patternSize, y + patternSize / 2);
        ctx.lineTo(x + patternSize / 2, y + patternSize);
        ctx.lineTo(x, y + patternSize / 2);
        ctx.closePath();
        ctx.stroke();
      }
    }
    ctx.restore();

    // 3. Silver Accented Borders
    const margin = 20;
    ctx.strokeStyle = '#E8E8E8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);
    ctx.lineWidth = 0.5;
    ctx.strokeRect(margin + 5, margin + 5, width - (margin + 5) * 2, height - (margin + 5) * 2);

    // 4. Central Text Styling
    ctx.textAlign = 'center';
    ctx.fillStyle = '#E8E8E8';
    
    ctx.font = 'bold 32px "Cinzel", serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('GUCCI', width / 2, height * 0.25);
    
    ctx.font = 'bold 12px "Inter", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('PARTNER SYNERGY 2026', width / 2, height * 0.35);

    // 5. Silver Foil Scratch Box
    const boxW = width * 0.75;
    const boxH = height * 0.35;
    const boxX = (width - boxW) / 2;
    const boxY = (height - boxH) / 2 + 30;

    const foilGrad = ctx.createLinearGradient(boxX, boxY, boxX + boxW, boxY + boxH);
    foilGrad.addColorStop(0, '#707070');
    foilGrad.addColorStop(0.3, '#C0C0C0');
    foilGrad.addColorStop(0.5, '#F5F5F5');
    foilGrad.addColorStop(0.7, '#C0C0C0');
    foilGrad.addColorStop(1, '#707070');
    
    ctx.fillStyle = foilGrad;
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.shadowBlur = 0;
    
    ctx.strokeStyle = '#E8E8E8';
    ctx.lineWidth = 1;
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    // 6. Interaction Label
    ctx.fillStyle = '#111';
    ctx.font = 'bold 11px "Inter", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('SCRATCH TO REVEAL', width / 2, boxY + (boxH / 2) + 5);

  }, [width, height]);

  const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    hasMovedInStroke.current = false;
    const pos = getPosition(e);
    lastPosition.current = pos;
    setGlowPos(pos);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !lastPosition.current) return;
    const currentPos = getPosition(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setGlowPos(currentPos);
    hasMovedInStroke.current = true;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = Math.min(width, height) * 0.25; 

    ctx.beginPath();
    ctx.moveTo(lastPosition.current.x, lastPosition.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPosition.current = currentPos;
  };

  const handleEnd = () => {
    if (isDrawing.current && hasMovedInStroke.current) {
        strokeCount.current += 1;
        if (strokeCount.current >= 4) {
            onReveal();
        }
    }
    isDrawing.current = false;
    lastPosition.current = null;
    setGlowPos({ x: -200, y: -200 });
  };

  if (isRevealed) return null;

  return (
    <div className={`absolute inset-0 z-20 select-none overflow-hidden ${className}`}>
        <div 
            className="absolute pointer-events-none w-40 h-40 rounded-full blur-[60px] opacity-30 mix-blend-screen transition-opacity duration-300 z-30 bg-white"
            style={{ 
                left: glowPos.x - 80, 
                top: glowPos.y - 80,
                display: isDrawing.current ? 'block' : 'none'
            }}
        />
        <canvas
            ref={canvasRef}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            className="w-full h-full block cursor-pointer transition-opacity duration-1000"
            style={{ touchAction: 'none' }}
        />
    </div>
  );
};

export default ScratchCard;
