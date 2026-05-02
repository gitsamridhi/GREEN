import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Heart, ArrowRight, Leaf, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { VendorCard } from '@/components/VendorCard';
import { VendorProfile } from '@/components/VendorProfile';
import { VENDORS, CATEGORIES, Vendor, Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';

export function Marketplace() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [selectedVendor, setSelectedVendor] = React.useState<Vendor | null>(null);
  const [liveUpdates, setLiveUpdates] = React.useState<string[]>([
    "Fresh delivery arrived at Mitti Ke Swad • 2 min ago",
    "Sattvik Spices just added Organic Turmeric • 5 min ago",
    "Someone just ordered from Green Orchard • Now"
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const updates = [
        "New organic farmer joined Green platform • Now",
        "Limited stock left for Desi Ghee at Mitti Swad • 1 min ago",
        "Free eco-delivery on orders above ₹500 • Today"
      ];
      setLiveUpdates(prev => [updates[Math.floor(Math.random() * updates.length)], ...prev.slice(0, 5)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const vendorsRef = React.useRef<HTMLDivElement>(null);

  const filteredVendors = activeCategory === 'All' 
    ? VENDORS 
    : VENDORS.filter(v => v.tags.includes(activeCategory) || v.signatureDishes.some(d => d.category === activeCategory));

  const scrollToVendors = () => {
    vendorsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="pt-20">
      {/* Real-time Ticker */}
      <div className="bg-primary/10 py-2 border-b overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-8 items-center px-4">
          {liveUpdates.map((update, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary shrink-0">
              <Zap className="h-3 w-3 fill-current" />
              {update}
            </div>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {selectedVendor && (
          <VendorProfile 
            vendor={selectedVendor} 
            onClose={() => setSelectedVendor(null)} 
            onAddToCart={addToCart}
          />
        )}

        {/* Hero Section */}
        <section className="mt-4 mb-16 px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="text-6xl md:text-7xl font-serif font-bold leading-[0.85] text-foreground tracking-tighter mb-6">
                Rooted in <span className="italic text-primary">Earth.</span><br/>Delivered in <span className="italic opacity-50">Vibes.</span>
              </h1>
              <p className="text-[10px] uppercase font-black tracking-[0.3em] text-primary mb-6 opacity-80">
                eat clean, shop green. live consciously.
              </p>
              <p className="text-xl opacity-80 max-w-lg font-medium leading-relaxed">
                Connecting you with 240+ local vendors specializing in zero-waste, organic, and clean food essentials across India.
              </p>
            </motion.div>
            
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <Button 
                onClick={scrollToVendors}
                size="lg" 
                className="rounded-full px-10 h-14 text-lg font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop Clean Marketplace
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <div ref={vendorsRef} className="mb-12 overflow-hidden px-4 scroll-mt-24">
          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-8 py-6 text-sm font-bold border-foreground/10 transition-all ${
                    activeCategory === cat ? 'shadow-xl shadow-primary/20' : 'hover:bg-white/50'
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredVendors.map((vendor, i) => (
              <motion.div
                key={vendor.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <VendorCard 
                  vendor={vendor} 
                  index={i} 
                  onSelect={setSelectedVendor}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Editorial "Vendor of the Week" Card */}
          {(() => {
            const weekVendor = VENDORS.find(v => v.name.includes("Mitti"));
            if (!weekVendor) return null;
            return (
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="group relative overflow-hidden bg-white/20 dark:bg-white/5 border border-white/30 rounded-[2rem] p-8 flex flex-col justify-between shadow-xl min-h-[400px]"
              >
                <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity">
                  <img src={weekVendor.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] text-primary mb-4">Vendor of the week</p>
                  <h3 className="text-4xl font-serif leading-tight font-bold italic mb-4">
                    {weekVendor.name.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}
                  </h3>
                  <p className="text-sm opacity-80 leading-relaxed font-medium">{weekVendor.description}</p>
                </div>
                <Button 
                  onClick={() => setSelectedVendor(weekVendor)}
                  className="relative z-10 w-full h-14 bg-foreground text-background hover:bg-primary rounded-2xl text-sm font-bold flex items-center justify-center gap-2 group/btn transition-all"
                >
                  Visit Store
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </motion.div>
            );
          })()}
        </div>

        {/* Trust Indicators */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12 bg-card rounded-3xl border border-dashed border-primary/20">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold">Verified Clean</h3>
            <p className="text-sm text-muted-foreground">Every vendor goes through rigorous quality checks for purity and hygiene.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <Heart className="h-6 w-6 fill-current" />
            </div>
            <h3 className="font-bold">Empowering Farmers</h3>
            <p className="text-sm text-muted-foreground">We skip the middlemen. Your money goes directly to those who produce your food.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Leaf className="h-6 w-6" />
            </div>
            <h3 className="font-bold">Zero Waste Packaging</h3>
            <p className="text-sm text-muted-foreground">Traditional mitti (clay) and leaf-based packaging for a guilt-free meal.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
