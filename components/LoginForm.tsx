
import React, { useState } from 'react';
import { LoginFormProps } from '../types';
import { useLanguage } from '../LanguageContext';
import { ArrowRight } from 'lucide-react';

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !password.trim()) {
      setError('Required');
      return;
    }
    onLogin({ fullName, phoneNumber, password });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center animate-fade-in p-6 md:p-8">
      <div className="text-center mb-8">
          <h3 className="text-lg md:text-xl font-display font-black text-gucci-gold mb-2 uppercase tracking-[0.3em]">
              {t('loginTitle')}
          </h3>
          <p className="text-[8px] md:text-[9px] text-white/40 font-sans uppercase tracking-[0.3em] font-medium leading-relaxed">
              {t('loginSubtitle')}
          </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="space-y-1 text-left">
              <label className="text-[8px] font-black uppercase tracking-[0.3em] text-gucci-gold/50 block">
                  {t('fullName')}
              </label>
              <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-gucci-gold transition-all placeholder-white/5 rounded-none"
                  placeholder="Enter Name"
              />
          </div>

          <div className="space-y-1 text-left">
              <label className="text-[8px] font-black uppercase tracking-[0.3em] text-gucci-gold/50 block">
                  {t('phoneNumber')}
              </label>
              <input 
                  type="tel" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-gucci-gold transition-all placeholder-white/5 rounded-none"
                  placeholder="+62"
              />
          </div>

          <div className="space-y-1 text-left">
              <label className="text-[8px] font-black uppercase tracking-[0.3em] text-gucci-gold/50 block">
                  {t('password')}
              </label>
              <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-gucci-gold transition-all placeholder-white/5 rounded-none"
                  placeholder="••••"
              />
          </div>

          {error && (
              <div className="text-red-500 text-[8px] text-center font-black uppercase tracking-widest">{error}</div>
          )}

          <button 
              type="submit" 
              className="w-full bg-gucci-gold text-black py-4 mt-2 flex items-center justify-center gap-3 group hover:bg-white transition-all shadow-xl active:scale-[0.98]"
          >
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">
                  {t('startJourney')}
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
      </form>
    </div>
  );
};

export default LoginForm;
