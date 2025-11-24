
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { ChevronLeft } from 'lucide-react';

interface VisionMissionProps {
    onBack: () => void;
}

const VisionMission: React.FC<VisionMissionProps> = ({ onBack }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl px-6 animate-fade-in-up z-20">
      
      {/* Title */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-black tracking-widest text-gray-900 uppercase">
          {t('visionTitle')}
        </h2>
        <div className="h-[2px] w-20 bg-gray-900 mx-auto my-4"></div>
      </div>

      {/* Content Box */}
      <div className="bg-[#F9F6EF]/95 p-8 md:p-12 border border-gray-300 shadow-xl rounded-sm ring-1 ring-white/50 text-center relative">
         {/* Decorative Corner Lines */}
         <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-400"></div>
         <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-400"></div>
         <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-400"></div>
         <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-400"></div>

         <p className="text-gray-800 font-serif text-lg md:text-xl leading-relaxed italic mb-6">
            "{t('visionText1')}"
         </p>
         
         <p className="text-gray-700 font-sans text-xs md:text-sm leading-7 tracking-wide font-medium">
            {t('visionText2')}
         </p>
      </div>

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mt-10 group flex items-center gap-2 px-6 py-3 border border-gray-800 hover:bg-gray-900 hover:text-white transition-all duration-300"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-sans text-xs font-bold uppercase tracking-[0.2em]">
            {t('backToHome')}
        </span>
      </button>
      
    </div>
  );
};

export default VisionMission;
