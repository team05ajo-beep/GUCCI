
import React, { useRef, useEffect } from 'react';
import { ScratchCardProps } from '../types';

const ScratchCard: React.FC<ScratchCardProps> = ({ width, height, isRevealed, onReveal, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPosition = useRef<{ x: number, y: number } | null>(null);
  const strokeCount = useRef(0);
  const hasMovedInStroke = useRef(false);

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

    // 2. Subtle Diamond Watermark Pattern
    ctx.save();
    ctx.globalAlpha = 0.04;
    ctx.strokeStyle = '#d4af37';
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

    // 3. Gold Accented Borders
    const margin = 20;
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);
    ctx.lineWidth = 0.5;
    ctx.strokeRect(margin + 5, margin + 5, width - (margin + 5) * 2, height - (margin + 5) * 2);

    // 4. Central Text Styling
    ctx.textAlign = 'center';
    ctx.fillStyle = '#d4af37';
    
    ctx.font = 'bold 32px "Cinzel", serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('GUCCI', width / 2, height * 0.25);
    
    ctx.font = 'bold 12px "Inter", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('THE GOLDEN SCRATCH 2026', width / 2, height * 0.35);

    // 5. Foil Scratch Box
    const boxW = width * 0.75;
    const boxH = height * 0.35;
    const boxX = (width - boxW) / 2;
    const boxY = (height - boxH) / 2 + 30;

    const foilGrad = ctx.createLinearGradient(boxX, boxY, boxX + boxW, boxY + boxH);
    foilGrad.addColorStop(0, '#8B6B23');
    foilGrad.addColorStop(0.3, '#D4AF37');
    foilGrad.addColorStop(0.5, '#FBF0D5');
    foilGrad.addColorStop(0.7, '#D4AF37');
    foilGrad.addColorStop(1, '#8B6B23');
    
    ctx.fillStyle = foilGrad;
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(212, 175, 55, 0.3)';
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.shadowBlur = 0;
    
    ctx.strokeStyle = '#d4af37';
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
    lastPosition.current = getPosition(e);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !lastPosition.current) return;
    const currentPos = getPosition(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    hasMovedInStroke.current = true;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    // Dynamically sized brush based on screen size
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
        // Faster reveal for better UX on mobile
        if (strokeCount.current >= 4) {
            onReveal();
        }
    }
    isDrawing.current = false;
    lastPosition.current = null;
  };

  if (isRevealed) return null;

  return (
    <div className={`absolute inset-0 z-20 select-none ${className}`}>
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
