import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';
import { useToast } from '../components/common/AlertProvider';

const MasterRecovery = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleRecovery = async (e) => {
    e.preventDefault();
    setLoading(true);
    const emailToAuth = email.trim().toLowerCase();
    
    if (emailToAuth !== 'kabirhaldar4444@gmail.com') {
      setLoading(false);
      return toast('Access Denied: This email is not authorized for master recovery.', 'error');
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(emailToAuth, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast('Recovery email sent! Please check your inbox.', 'success');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fffcf9] relative overflow-hidden font-sans selection:bg-rose-100">
      {/* Background elements similar to Login.jsx */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#fffcf9]">
        <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-[#A51C30]/5 rounded-full blur-[150px] animate-drift-left opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-[#C49619]/5 rounded-full blur-[150px] animate-drift-right opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-[400px] px-6 animate-fade-in py-12">
        <div className="flex flex-col items-center mb-16">
          <div className="w-48 h-auto p-5 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100/50 hover:scale-[1.03] transition-transform duration-700">
            <img src="/Elitetoolistic.png" alt="Harvard Learning" className="w-full h-full object-contain" />
          </div>
          <div className="mt-8 text-center space-y-1">
             <h1 className="text-2xl font-black tracking-widest text-[#1e293b] uppercase font-serif">Master Recovery</h1>
             <p className="text-[10px] font-black tracking-[0.4em] text-[#A51C30] uppercase">Administrator Access Restored</p>
          </div>
        </div>

        <div className="glass-card-saas p-10 !rounded-[2.5rem] shadow-2xl border-t-4 border-t-[#A51C30]">
          <form onSubmit={handleRecovery} className="flex flex-col gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Administrator Email
                </label>
                <div className="relative flex items-center group">
                  <div className="absolute left-4 text-slate-300 group-focus-within:text-[#A51C30] transition-colors">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-premium w-full !pl-14 text-sm"
                    placeholder="Enter admin email"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-premium w-full shadow-2xl relative overflow-hidden group"
            >
              <span className={`relative z-10 flex items-center justify-center gap-3 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                Send Recovery Link
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </span>
              
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </button>

            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#A51C30] transition-colors text-center"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MasterRecovery;
