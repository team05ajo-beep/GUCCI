import React from 'react';

export const ChristmasTree: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative ${className} flex justify-center items-end`}>
      {/* Realistic Tree Image with Blend Mode to remove white background visual */}
      <img 
        src="https://images-cdn.ubuy.co.id/63f37c8b337cf51e682f8f13-ourwarm-24-34-mini-christmas-tree.jpg"
        alt="Real Christmas Tree"
        className="w-full h-full object-contain mix-blend-multiply contrast-125 brightness-110"
      />
      
      {/* Animated Lights Overlay to make it look alive */}
      {/* Top Star Glow */}
      <div className="absolute top-[5%] left-[50%] -translate-x-1/2 w-4 h-4 bg-yellow-200 rounded-full blur-[4px] animate-pulse"></div>
      
      {/* Random Lights distributed over the tree shape */}
      <div className="absolute top-[25%] left-[45%] w-2 h-2 bg-red-500 rounded-full blur-[1px] animate-twinkle shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
      <div className="absolute top-[35%] right-[40%] w-2 h-2 bg-yellow-400 rounded-full blur-[1px] animate-twinkle shadow-[0_0_5px_rgba(250,204,21,0.8)]" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-[45%] left-[40%] w-2 h-2 bg-red-500 rounded-full blur-[1px] animate-twinkle shadow-[0_0_5px_rgba(239,68,68,0.8)]" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute bottom-[35%] right-[35%] w-2 h-2 bg-yellow-400 rounded-full blur-[1px] animate-twinkle shadow-[0_0_5px_rgba(250,204,21,0.8)]" style={{ animationDelay: '0.8s' }}></div>
      <div className="absolute bottom-[25%] left-[35%] w-2 h-2 bg-red-500 rounded-full blur-[1px] animate-twinkle shadow-[0_0_5px_rgba(239,68,68,0.8)]" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[15%] right-[45%] w-2 h-2 bg-yellow-400 rounded-full blur-[1px] animate-twinkle shadow-[0_0_5px_rgba(250,204,21,0.8)]" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};