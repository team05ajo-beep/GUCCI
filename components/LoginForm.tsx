
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
    <div className="w-full h-full flex flex-col justify-center p-8 md:p-12 glass-panel shadow-2xl relative overflow-hidden">
      
      {/* DECORATIVE LOCK */}
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Lock className="w-24 h-24 text-white" />
      </div>

      <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-3 uppercase tracking-[0.4em]">
              {t('loginTitle')}
          </h3>
          <p className="text-[9px] md:text-[11px] text-white/50 font-sans uppercase tracking-[0.4em] font-black leading-relaxed">
              {t('loginSubtitle')}
          </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
          <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.5em] text-gucci-silver/80 block">
                  {t('fullName')}
              </label>
              <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-base md:text-lg text-white focus:outline-none focus:border-gucci-silver transition-all placeholder-white/5 rounded-none"
                  placeholder="EX: BAMBANG WIJAYA"
              />
          </div>

          <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.5em] text-gucci-silver/80 block">
                  {t('phoneNumber')}
              </label>
              <input 
                  type="tel" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-base md:text-lg text-white focus:outline-none focus:border-gucci-silver transition-all placeholder-white/5 rounded-none"
                  placeholder="+62 812 XXXX"
              />
          </div>

          <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.5em] text-gucci-silver/80 block">
                  {t('password')}
              </label>
              <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-base md:text-lg text-white focus:outline-none focus:border-gucci-silver transition-all placeholder-white/5 rounded-none"
                  placeholder="••••••••"
              />
          </div>

          {error && (
              <div className="text-red-500 text-[10px] text-center font-black uppercase tracking-widest bg-red-500/5 py-3 border border-red-500/20">
                {error}
              </div>
          )}

          <button 
              type="submit" 
              className="group relative w-full bg-gradient-to-r from-gucci-chrome via-gucci-platinum to-gucci-chrome text-black py-5 md:py-6 mt-6 flex items-center justify-center gap-4 transition-all hover:brightness-110 active:scale-95 shadow-xl border border-white/10"
          >
              <span className="text-[11px] font-black uppercase tracking-[0.5em]">
                  {t('startJourney')}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
      </form>
    </div>
  );
};

export default LoginForm;
