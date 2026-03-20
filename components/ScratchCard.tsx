
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

    // 1. Deep Emerald Base
    ctx.fillStyle = '#012210';
    ctx.fillRect(0, 0, width, height);

    // 2. Islamic Geometric Watermark
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = '#D4AF37';
    const patternSize = 50;
    for (let x = 0; x < width + patternSize; x += patternSize) {
      for (let y = 0; y < height + patternSize; y += patternSize) {
        ctx.beginPath();
        ctx.moveTo(x + 25, y); ctx.lineTo(x + 50, y + 25); ctx.lineTo(x + 25, y + 50); ctx.lineTo(x, y + 25); ctx.closePath(); ctx.stroke();
        ctx.strokeRect(x + 10, y + 10, 30, 30);
      }
    }
    ctx.restore();

    // 3. Borders
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1;
    ctx.strokeRect(15, 15, width - 30, height - 30);

    // 4. Central Text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 30px "Cinzel", serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('GUCCI', width / 2, height * 0.25);
    
    ctx.font = 'bold 10px "Inter", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('IDUL FITRI BERKAH 2026', width / 2, height * 0.35);

    // 5. Gold Foil Box
    const boxW = width * 0.8;
    const boxH = height * 0.35;
    const boxX = (width - boxW) / 2;
    const boxY = (height - boxH) / 2 + 30;

    const foilGrad = ctx.createLinearGradient(boxX, boxY, boxX + boxW, boxY + boxH);
    foilGrad.addColorStop(0, '#8A6E2F');
    foilGrad.addColorStop(0.5, '#D4AF37');
    foilGrad.addColorStop(1, '#8A6E2F');
    
    ctx.fillStyle = foilGrad;
    ctx.fillRect(boxX, boxY, boxW, boxH);
    
    // Pattern on foil
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = '#FFF';
    for (let x = boxX; x < boxX + boxW; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, boxY); ctx.lineTo(x + boxW/5, boxY + boxH); ctx.stroke();
    }
    ctx.restore();

    ctx.fillStyle = '#111';
    ctx.font = 'bold 11px "Inter", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('USAP UNTUK BERKAH', width / 2, boxY + (boxH / 2) + 5);

  }, [width, height]);

  const getPosition = (e: any) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: cx - rect.left, y: cy - rect.top };
  };

  const handleStart = (e: any) => {
    isDrawing.current = true;
    hasMovedInStroke.current = false;
    const pos = getPosition(e);
    lastPosition.current = pos;
    setGlowPos(pos);
  };

  const handleMove = (e: any) => {
    if (!isDrawing.current || !lastPosition.current) return;
    const currentPos = getPosition(e);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    setGlowPos(currentPos);
    hasMovedInStroke.current = true;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.lineWidth = width * 0.25;
    ctx.beginPath(); ctx.moveTo(lastPosition.current.x, lastPosition.current.y); ctx.lineTo(currentPos.x, currentPos.y); ctx.stroke();
    lastPosition.current = currentPos;
  };

  const handleEnd = () => {
    if (isDrawing.current && hasMovedInStroke.current) {
        strokeCount.current += 1;
        if (strokeCount.current >= 4) onReveal();
    }
    isDrawing.current = false;
    lastPosition.current = null;
    setGlowPos({ x: -200, y: -200 });
  };

  if (isRevealed) return null;

  return (
    <div className={`absolute inset-0 z-20 select-none overflow-hidden ${className}`}>
        <div className="absolute pointer-events-none w-40 h-40 rounded-full blur-[60px] opacity-40 z-30 bg-gucci-gold"
            style={{ left: glowPos.x - 80, top: glowPos.y - 80, display: isDrawing.current ? 'block' : 'none' }}
        />
        <canvas ref={canvasRef} onMouseDown={handleStart} onMouseMove={handleMove} onMouseUp={handleEnd} onMouseLeave={handleEnd} onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd} className="w-full h-full block cursor-pointer transition-opacity duration-1000" style={{ touchAction: 'none' }} />
    </div>
  );
};

export default ScratchCard;
