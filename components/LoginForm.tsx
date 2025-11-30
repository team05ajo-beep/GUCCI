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
      setError('Please fill in all fields');
      return;
    }
    
    // Simple validation passed
    onLogin({ fullName, phoneNumber, password });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center animate-fade-in-up">
      <div className="bg-gucci-cream p-8 md:p-10 shadow-2xl relative border-4 border-double border-gucci-gold">
        {/* Decorative Top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gucci-green via-gucci-red to-gucci-green"></div>

        <div className="mb-8 text-center">
            <h3 className="text-2xl font-serif font-bold text-gucci-green mb-2 uppercase tracking-wide">
                {t('loginTitle')}
            </h3>
            <p className="text-xs text-gray-600 font-sans tracking-wide">
                {t('loginSubtitle')}
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gucci-darkGreen">
                    {t('fullName')}
                </label>
                <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-transparent border-b border-gucci-gold py-2 text-sm focus:outline-none focus:border-gucci-red transition-colors placeholder-gray-400 text-black"
                    placeholder="Jane Doe"
                />
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gucci-darkGreen">
                    {t('phoneNumber')}
                </label>
                <input 
                    type="tel" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-transparent border-b border-gucci-gold py-2 text-sm focus:outline-none focus:border-gucci-red transition-colors placeholder-gray-400 text-black"
                    placeholder="+62 812..."
                />
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gucci-darkGreen">
                    {t('password')}
                </label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-gucci-gold py-2 text-sm focus:outline-none focus:border-gucci-red transition-colors placeholder-gray-400 text-black"
                    placeholder="••••••••"
                />
            </div>

            {error && (
                <div className="text-gucci-red text-xs text-center pt-2">{error}</div>
            )}

            <button 
                type="submit" 
                className="w-full bg-gucci-green text-gucci-gold py-4 mt-4 flex items-center justify-center gap-2 group hover:bg-gucci-black transition-colors duration-500 border border-gucci-gold"
            >
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
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