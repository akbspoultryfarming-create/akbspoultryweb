'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, LogIn, Leaf, Bird, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('akbs_admin_token') : null;
    if (t) router.replace('/admin');
  }, [router]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('akbs_admin_token', data.token);
      router.replace('/admin');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-akbs-dark via-akbs-green to-akbs-dark flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-akbs-gold/20 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-akbs-green/40 blur-3xl" />
      <div className="absolute inset-0 opacity-10">
        <img src="https://images.unsplash.com/photo-1630090374791-c9eb7bab3935?auto=format&fit=crop&w=2000&q=80" alt="" className="w-full h-full object-cover" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-luxury-lg p-8 md:p-10 border border-white/40">
          <div className="flex items-center justify-center mb-6">
            <div className="relative h-16 w-16 rounded-2xl btn-gradient-green flex items-center justify-center">
              <Leaf className="h-8 w-8 text-akbs-gold" strokeWidth={2.5} />
              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-akbs-gold flex items-center justify-center">
                <Bird className="h-3.5 w-3.5 text-akbs-dark" strokeWidth={3} />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-akbs-green/10 mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-akbs-green" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-akbs-green uppercase">Secure Admin Area</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-akbs-dark mb-2">AKBS Admin Panel</h1>
            <p className="text-sm text-akbs-ink/60">Enter your password to manage inquiries</p>
          </div>

          <form onSubmit={submit}>
            <label className="block text-xs font-semibold text-akbs-ink/70 mb-1.5">Admin Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-akbs-ink/40" />
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
                className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-akbs-bg border border-transparent focus:border-akbs-green focus:bg-white outline-none transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-akbs-ink/40 hover:text-akbs-green"
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full btn-gradient-green text-white font-semibold shadow-luxury hover:scale-[1.02] transition-transform disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" /> {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-akbs-ink/50 hover:text-akbs-green font-medium">← Back to website
            </a>
          </div>
        </div>

        <p className="text-center text-white/50 text-xs mt-6 font-medium">© 2026 AKBS Poultry Farming Pvt Ltd</p>
      </motion.div>
    </main>
  );
}

export default LoginPage;
