
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

    // 1. Matte Black Background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle GG Monogram Watermark
    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 9px serif';
    const spacing = 40;
    for (let x = 0; x < width + spacing; x += spacing) {
      for (let y = 0; y < height + spacing; y += spacing) {
        ctx.fillText('G G', x, y);
      }
    }
    ctx.restore();

    // 3. Ornate Double Gold Border
    const margin = 16;
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);
    ctx.lineWidth = 0.6;
    ctx.strokeRect(margin + 4, margin + 4, width - (margin + 4) * 2, height - (margin + 4) * 2);

    // 4. Corner Flourishes (Matching the image style)
    const drawFlourish = (x: number, y: number, r: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(r);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(18, 0, 22, 22);
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(0, 18, 22, 22);
      ctx.stroke();
      // Swirl detail
      ctx.beginPath();
      ctx.arc(10, 10, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#d4af37';
      ctx.fill();
      ctx.restore();
    };

    drawFlourish(margin, margin, 0);
    drawFlourish(width - margin, margin, Math.PI / 2);
    drawFlourish(width - margin, height - margin, Math.PI);
    drawFlourish(margin, height - margin, -Math.PI / 2);

    // 5. Typography: "GUCCI" & "THE GOLDEN SCRATCH"
    ctx.textAlign = 'center';
    ctx.fillStyle = '#d4af37';
    
    ctx.font = 'bold 26px "Cinzel", serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('GUCCI', width / 2, height * 0.22);
    
    ctx.font = 'bold 14px "Inter", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('THE GOLDEN SCRATCH', width / 2, height * 0.32);

    // 6. Central Gold Foil Box
    const boxW = width * 0.7;
    const boxH = height * 0.36;
    const boxX = (width - boxW) / 2;
    const boxY = (height - boxH) / 2 + 25;

    const goldGrad = ctx.createLinearGradient(boxX, boxY, boxX + boxW, boxY + boxH);
    goldGrad.addColorStop(0, '#8B6B23');
    goldGrad.addColorStop(0.4, '#D4AF37');
    goldGrad.addColorStop(0.5, '#F9E8C0'); // Foil shine
    goldGrad.addColorStop(0.6, '#D4AF37');
    goldGrad.addColorStop(1, '#8B6B23');
    
    ctx.fillStyle = goldGrad;
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 1;
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    // 7. Center "GOSOK DI SINI" Text
    ctx.fillStyle = '#0a0a0a';
    ctx.font = 'bold 12px "Inter", sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('GOSOK DI SINI', width / 2, boxY + (boxH / 2) + 5);

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
    ctx.lineWidth = Math.min(width, height) * 0.28; 

    ctx.beginPath();
    ctx.moveTo(lastPosition.current.x, lastPosition.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPosition.current = currentPos;
  };

  const handleEnd = () => {
    if (isDrawing.current && hasMovedInStroke.current) {
        strokeCount.current += 1;
        if (strokeCount.current >= 3) {
            onReveal();
        }
    }
    isDrawing.current = false;
    lastPosition.current = null;
  };

  if (isRevealed) return null;

  return (
    <div className={`absolute inset-0 z-10 select-none ${className}`}>
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
