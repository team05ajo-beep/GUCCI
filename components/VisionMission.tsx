
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { ChevronLeft } from 'lucide-react';

interface VisionMissionProps {
    onBack: () => void;
}

const VisionMission: React.FC<VisionMissionProps> = ({ onBack }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4 animate-fade-in-up z-20 my-10">
      
      {/* Title */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-black tracking-widest text-gray-900 uppercase">
          {t('visionTitle')}
        </h2>
        <div className="h-[2px] w-16 bg-gray-900 mx-auto my-3"></div>
      </div>

      {/* Content Box */}
      <div className="bg-[#F9F6EF]/95 border border-gray-300 shadow-xl rounded-sm ring-1 ring-white/50 relative w-full flex flex-col max-h-[70vh]">
         {/* Decorative Corner Lines */}
         <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gray-400 z-10"></div>
         <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gray-400 z-10"></div>
         <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gray-400 z-10"></div>
         <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gray-400 z-10"></div>

         <div className="overflow-y-auto p-8 md:p-12 custom-scrollbar">
             {/* Optional Header Text */}
             {t('visionText1') && (
                 <h3 className="text-gray-900 font-serif text-xl font-bold mb-6 text-center underline underline-offset-4 decoration-gray-400 decoration-1">
                    {t('visionText1')}
                 </h3>
             )}
             
             {/* Main Text Body - Left Aligned for Lists */}
             <div className="text-gray-800 font-sans text-xs md:text-sm leading-7 tracking-wide whitespace-pre-line text-left">
                {t('visionText2')}
             </div>
         </div>
      </div>

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mt-8 group flex items-center gap-2 px-6 py-3 border border-gray-800 bg-white/80 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-md backdrop-blur-sm"
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
