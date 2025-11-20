import React, { useRef, useEffect, useState } from 'react';
import { ScratchCardProps } from '../types';
import { SCRATCH_THRESHOLD } from '../constants';
import { HandMetal, Sparkles } from 'lucide-react';

const ScratchCard: React.FC<ScratchCardProps> = ({ width, height, isRevealed, onReveal, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showInstruction, setShowInstruction] = useState(true);
  
  // Interaction Refs
  const isDrawing = useRef(false);
  const lastPosition = useRef<{ x: number, y: number } | null>(null);
  const hasMoved = useRef(false); // Track if actual movement occurred
  const strokeCountRef = useRef(0);
  const lastCheckTime = useRef(0); // For throttling progress checks

  // Initialize Canvas with Modern Gold Foil Design
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set actual canvas size
    canvas.width = width;
    canvas.height = height;

    // 1. Gold Foil Gradient Background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    // Lux Gold Palette - Smoother transitions
    gradient.addColorStop(0, '#BF953F');
    gradient.addColorStop(0.25, '#FCF6BA');
    gradient.addColorStop(0.5, '#B38728');
    gradient.addColorStop(0.75, '#FBF5B7');
    gradient.addColorStop(1, '#BF953F');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Add Geometric Pattern (Diagonal Lines) - Cleaner look
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    
    // Draw diagonals
    for(let i = -height; i < width; i += 25) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + height, height);
        ctx.stroke();
    }

    // 3. Add Texture - Simplified for cleaner look
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const s = Math.random() * 2;
        ctx.fillRect(x, y, s, s);
    }
    
    // 4. Add "GUCCI" Watermark
    ctx.save();
    ctx.rotate(-Math.PI / 6);
    ctx.fillStyle = 'rgba(160, 82, 45, 0.1)'; // Very subtle
    ctx.font = '900 40px serif';
    for (let x = -500; x < width + 500; x += 160) {
        for (let y = -500; y < height + 500; y += 120) {
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

    // Optimization: Get smaller image data sample if possible, or just sample efficiently
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    const totalPixels = pixels.length / 4;

    // Optimization: Sample every 32nd pixel (faster calculation)
    for (let i = 3; i < pixels.length; i += 32) {
        if (pixels[i] === 0) transparentPixels += 8; // Approximate count
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

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
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
    
    // 1. Massive brush size (30% of screen) for very easy clearing
    ctx.lineWidth = Math.min(width, height) * 0.30; 
    
    // 2. Soft edges to make the scratch look smoother and cover more effective area
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#000'; // Shadow color is required for shadowBlur to work in destination-out

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPosition.current = currentPos;
    
    // Throttle progress check to avoid lag (check every ~150ms)
    const now = Date.now();
    if (now - lastCheckTime.current > 150) {
        checkProgress();
        lastCheckTime.current = now;
    }
  };

  const handleEnd = () => {
    if (isDrawing.current) {
        if (hasMoved.current) {
            strokeCountRef.current += 1;
            
            // Force check immediately when stroke ends
            checkProgress();

            // Guarantee win after 4 strokes
            if (strokeCountRef.current >= 4) {
                onReveal();
            }
        }
    }
    
    isDrawing.current = false;
    lastPosition.current = null;
    hasMoved.current = false;
  };

  if (isRevealed) return null;

  return (
    <div className={`absolute inset-0 z-10 overflow-hidden rounded-lg ${className}`}>
        <canvas
            ref={canvasRef}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            className="touch-none cursor-pointer w-full h-full"
        />
        
        {showInstruction && (
             <div className="absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-500">
                 <div className="relative group">
                     <div className="absolute -inset-4 bg-black/60 blur-xl rounded-full animate-pulse"></div>
                     
                     <div className="relative bg-gradient-to-r from-gucci-red to-red-900 text-white px-8 py-4 rounded-full border-2 border-yellow-400/50 shadow-2xl flex items-center gap-3 transform animate-bounce">
                        <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
                        <span className="font-black tracking-widest text-lg drop-shadow-md">
                            GOSOK DI SINI
                        </span>
                        <HandMetal className="w-5 h-5 text-yellow-300 -rotate-12" />
                     </div>
                 </div>
            </div>
        )}
    </div>
  );
};

export default ScratchCard;