import * as React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, ShieldCheck, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export function AuthPage() {
  const { login, mockLogin, mockAdminLogin, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate('/admin-dashboard', { replace: true });
      } else {
        const from = (location.state as any)?.from?.pathname || '/marketplace';
        navigate(from, { replace: true });
      }
    }
  }, [user, navigate, location]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card/40 backdrop-blur-2xl border border-foreground/5 rounded-[3rem] p-10 shadow-2xl text-center">
          <div className="mb-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 mb-6">
              <Leaf className="text-background h-8 w-8" />
            </div>
            <h1 className="text-4xl font-serif font-black italic tracking-tighter mb-2">GREEN.</h1>
            <p className="text-[10px] uppercase font-black tracking-[0.3em] text-primary opacity-60">
              Your circular food journey begins here
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={login}
              className="w-full h-16 rounded-2xl bg-white hover:bg-white/90 text-black border border-foreground/5 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-transform active:scale-95"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center px-2">
                <div className="w-full border-t border-foreground/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em] text-foreground/30 bg-transparent px-4">
                <span>Or Demo Access</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={mockLogin}
                variant="outline"
                className="h-16 rounded-2xl border-foreground/5 bg-foreground/5 hover:bg-foreground/10 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
              >
                <UserCircle className="h-4 w-4" />
                User Demo
              </Button>
              <Button 
                onClick={mockAdminLogin}
                variant="outline"
                className="h-16 rounded-2xl border-foreground/5 bg-foreground/5 hover:bg-foreground/10 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
              >
                <ShieldCheck className="h-4 w-4" />
                Admin Demo
              </Button>
            </div>
          </div>

          <p className="mt-10 text-[10px] font-medium opacity-40 leading-relaxed max-w-[240px] mx-auto text-center uppercase tracking-widest">
            By continuing, you agree to our <span className="underline cursor-pointer">Conscious Terms</span> & <span className="underline cursor-pointer">Privacy Pact</span>.
          </p>
        </div>

        {/* Floating Indicator */}
        <div className="mt-8 flex justify-center">
            <Button variant="ghost" onClick={() => navigate('/')} className="rounded-full text-[10px] uppercase font-black tracking-[0.2em] opacity-40 hover:opacity-100">
                Back to landing
            </Button>
        </div>
      </motion.div>
    </div>
  );
}
