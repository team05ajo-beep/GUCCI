
import React, { useState } from 'react';
import { LoginFormProps } from '../types';
import { useLanguage } from '../LanguageContext';
import { ArrowRight, Lock } from 'lucide-react';

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !password.trim()) {
      setError('Harap lengkapi semua data');
      return;
    }
    onLogin({ fullName, phoneNumber, password });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center p-6 md:p-10 bg-black/90 backdrop-blur-xl shadow-2xl relative overflow-hidden box-border">
      
      {/* DECORATIVE LOCK */}
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
        <Lock className="w-16 h-16 md:w-20 md:h-20 text-white" />
      </div>

      <div className="text-center mb-8 md:mb-10 flex-shrink-0">
          <h3 className="text-xl md:text-2xl font-display font-black text-white mb-2 uppercase tracking-[0.3em] leading-tight">
              {t('loginTitle')}
          </h3>
          <p className="text-[8px] md:text-[10px] text-white/60 font-sans uppercase tracking-[0.3em] font-bold leading-relaxed px-2">
              {t('loginSubtitle')}
          </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 flex-grow overflow-y-auto custom-scrollbar px-1">
          <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50 block">
                  {t('fullName')}
              </label>
              <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border-b border-white/20 py-2 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-white transition-all placeholder-white/20 rounded-none px-2"
                  placeholder="EX: BAMBANG WIJAYA"
              />
          </div>

          <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50 block">
                  {t('phoneNumber')}
              </label>
              <input 
                  type="tel" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-white/5 border-b border-white/20 py-2 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-white transition-all placeholder-white/20 rounded-none px-2"
                  placeholder="+62 812 XXXX"
              />
          </div>

          <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50 block">
                  {t('password')}
              </label>
              <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border-b border-white/20 py-2 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-white transition-all placeholder-white/20 rounded-none px-2"
                  placeholder="••••••••"
              />
          </div>

          {error && (
              <div className="text-red-400 text-[9px] text-center font-black uppercase tracking-widest bg-red-500/10 py-2 border border-red-500/30">
                {error}
              </div>
          )}

          <button 
              type="submit" 
              className="group relative w-full bg-white text-black py-4 md:py-5 flex items-center justify-center gap-3 transition-all hover:bg-gray-200 active:scale-[0.98] shadow-2xl mt-4 flex-shrink-0"
          >
              <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-black">
                  {t('startJourney')}
              </span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-black group-hover:translate-x-1 transition-transform" />
          </button>
      </form>
    </div>
  );
};

export default LoginForm;
