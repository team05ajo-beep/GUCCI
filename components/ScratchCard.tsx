
import React, { useRef, useEffect, useState } from 'react';
import { ScratchCardProps } from '../types';
import { SCRATCH_THRESHOLD } from '../constants';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const ScratchCard: React.FC<ScratchCardProps> = ({ width, height, isRevealed, onReveal, className }) => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showInstruction, setShowInstruction] = useState(true);
  
  // Interaction Refs
  const isDrawing = useRef(false);
  const lastPosition = useRef<{ x: number, y: number } | null>(null);
  const hasMoved = useRef(false); 
  const strokeCountRef = useRef(0);
  const lastCheckTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // Luxury Gold Foil Texture for Gucci
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#d4af37'); // Gold
    gradient.addColorStop(0.2, '#f7e7ce'); // Light Gold
    gradient.addColorStop(0.4, '#c5a028'); // Dark Gold
    gradient.addColorStop(0.6, '#f9f1d0'); // Cream Gold
    gradient.addColorStop(0.8, '#d4af37');
    gradient.addColorStop(1, '#b08d26');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Fine Noise
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    for (let i = 0; i < width * height * 0.05; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillRect(x, y, 1, 1);
    }
    
    // Geometric Pattern (Gucci-esque)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    const spacing = 40;
    for(let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for(let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // Watermark - GUCCI
    ctx.save();
    ctx.rotate(-Math.PI / 6);
    ctx.fillStyle = 'rgba(22, 63, 40, 0.08)'; // Subtle Gucci Green
    ctx.font = '900 48px "Cinzel", serif'; 
    for (let x = -500; x < width + 500; x += 200) {
        for (let y = -500; y < height + 500; y += 100) {
            ctx.fillText("GUCCI", x, y);
        }
    }
    ctx.restore();

  }, [width, height, isRevealed]);

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const totalPixels = pixels.length / 4;
    let transparentPixels = 0;

    // Sample pixels for performance (check every 32nd pixel)
    for (let i = 3; i < pixels.length; i += 32) {
        if (pixels[i] === 0) transparentPixels += 8; 
    }

    const percent = (transparentPixels / totalPixels) * 100;
    
    if (percent > SCRATCH_THRESHOLD) {
      onReveal();
    }
  };

  const getPosition = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    hasMoved.current = false; 
    setShowInstruction(false);
    const pos = getPosition(e);
    lastPosition.current = pos;
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !lastPosition.current) return;
    
    // Prevent default scrolling behavior on mobile
    // Note: CSS touch-action: none is also applied, but this is a fallback
    // e.preventDefault(); 
    
    const currentPos = getPosition(e);
    const lastPos = lastPosition.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    hasMoved.current = true;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = Math.min(width, height) * 0.25; 
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#000';

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPosition.current = currentPos;
    
    const now = Date.now();
    if (now - lastCheckTime.current > 150) {
        checkProgress();
        lastCheckTime.current = now;
    }
  };

  const handleEnd = () => {
    if (isDrawing.current && hasMoved.current) {
        strokeCountRef.current += 1;
        checkProgress();
        if (strokeCountRef.current >= 4) {
            onReveal();
        }
    }
    isDrawing.current = false;
    lastPosition.current = null;
    hasMoved.current = false;
  };

  if (isRevealed) return null;

  return (
    <div className={`absolute inset-0 z-10 overflow-hidden select-none ${className}`}>
        {/* Added touch-none to prevent scrolling on mobile while scratching */}
        <canvas
            ref={canvasRef}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            className="touch-none cursor-pointer w-full h-full block"
            style={{ touchAction: 'none' }}
        />
        
        {showInstruction && (
             <div className="absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-500">
                 <div className="relative bg-gucci-green text-gucci-gold px-6 py-3 rounded-full flex items-center gap-2 border border-gucci-gold shadow-lg animate-pulse">
                    <Sparkles className="w-4 h-4 text-gucci-gold" />
                    <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold whitespace-nowrap">
                        {t('scratchHere')}
                    </span>
                 </div>
            </div>
        )}
    </div>
  );
};

export default ScratchCard;
