
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
    <div className="w-full h-full flex flex-col justify-center animate-fade-in">
      <div className="p-8 h-full flex flex-col justify-center">
        
        <div className="mb-10 text-center">
            <h3 className="text-xl font-display font-black text-gucci-gold mb-3 uppercase tracking-[0.3em]">
                {t('loginTitle')}
            </h3>
            <p className="text-[9px] text-white/40 font-sans uppercase tracking-[0.4em] font-medium leading-relaxed">
                {t('loginSubtitle')}
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gucci-gold/60 block">
                    {t('fullName')}
                </label>
                <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-white focus:outline-none focus:border-gucci-gold transition-all placeholder-white/10 rounded-none"
                    placeholder="Enter Name"
                />
            </div>

            <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gucci-gold/60 block">
                    {t('phoneNumber')}
                </label>
                <input 
                    type="tel" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-white focus:outline-none focus:border-gucci-gold transition-all placeholder-white/10 rounded-none"
                    placeholder="+62"
                />
            </div>

            <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gucci-gold/60 block">
                    {t('password')}
                </label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-white focus:outline-none focus:border-gucci-gold transition-all placeholder-white/10 rounded-none"
                    placeholder="••••"
                />
            </div>

            {error && (
                <div className="text-red-500 text-[8px] text-center font-black uppercase tracking-widest">{error}</div>
            )}

            <button 
                type="submit" 
                className="w-full bg-gucci-gold text-black py-5 mt-4 flex items-center justify-center gap-3 group hover:bg-white transition-all shadow-xl"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                    {t('startJourney')}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
