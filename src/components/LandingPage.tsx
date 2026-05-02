import * as React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Leaf, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 px-4">
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000" 
            alt="Organic produce" 
            className="w-full h-full object-cover scale-110 opacity-30 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 rounded-full bg-primary/10 text-primary text-[10px] uppercase font-black tracking-[0.3em] backdrop-blur-sm border border-primary/20">
              The Clean Food Revolution
            </span>
            <h1 className="text-7xl md:text-9xl font-serif font-bold leading-[0.8] tracking-tighter text-foreground mb-12">
              Pure Food.<br/>
              <span className="italic text-primary">Pure Earth.</span><br/>
              Delivered.
            </h1>
            <p className="text-xl md:text-2xl font-medium opacity-60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Green connects you to a curated circle of conscious artisans, farmers, and zero-waste vendors across the country.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                onClick={() => navigate('/auth')}
                className="h-20 px-12 rounded-full text-lg font-bold uppercase tracking-widest bg-primary text-background hover:scale-105 transition-transform shadow-2xl shadow-primary/30 group"
              >
                Join the Circle
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Button>
              <Button 
                variant="outline"
                className="h-20 px-12 rounded-full text-lg font-bold uppercase tracking-widest border-foreground/10 hover:bg-foreground/5 backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-foreground to-transparent" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-4 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Leaf, title: 'Zero Waste', desc: 'Plastic-free packaging and circular delivery systems.' },
              { icon: ShieldCheck, title: 'Verified Clean', desc: 'Strict lab-testing for pesticides and chemicals.' },
              { icon: Zap, title: 'Hyper Local', desc: 'Directly supporting community farmers and artisans.' },
              { icon: Sparkles, title: 'Conscious Tech', desc: 'AI-powered tracking for every gram of carbon offset.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-foreground/5 border border-foreground/5 hover:border-primary/20 transition-colors group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold italic mb-4">{item.title}</h3>
                <p className="text-sm opacity-60 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
              <Leaf className="text-background h-6 w-6" />
            </div>
            <span className="text-2xl font-serif font-black italic tracking-tighter">GREEN.</span>
          </div>
          <p className="text-sm font-medium opacity-40">
            © 2026 Green Essentials India. Eat clean, shop green. live consciously.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest opacity-60">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Impact Report</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
