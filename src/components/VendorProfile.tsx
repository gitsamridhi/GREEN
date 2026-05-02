import * as React from 'react';
import { X, Star, MapPin, ShieldCheck, Leaf, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Vendor, Product } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';

interface VendorProfileProps {
  vendor: Vendor | null;
  onClose: () => void;
  onAddToCart: (product: Product, vendorName: string) => void;
}

export function VendorProfile({ vendor, onClose, onAddToCart }: VendorProfileProps) {
  if (!vendor) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-card rounded-[3rem] shadow-2xl overflow-hidden border border-foreground/5 h-[90vh] flex flex-col md:flex-row"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 h-10 w-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="md:w-1/2 aspect-square md:aspect-auto">
            <img 
              src={vendor.image} 
              alt={vendor.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="md:w-1/2 p-12 overflow-y-auto custom-scrollbar">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Verified Clean Vendor</span>
              </div>
              <h2 className="text-4xl font-serif font-bold italic mb-2 leading-tight">{vendor.name}</h2>
              <div className="flex items-center gap-4 text-xs font-bold opacity-60 mb-8">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  {vendor.rating}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {vendor.location}
                </div>
              </div>
            </div>

            <p className="text-base font-medium leading-relaxed opacity-80 mb-8 italic text-muted-foreground">
              "{vendor.description}"
            </p>

            <div className="mb-10 text-left">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Signature Items</h4>
              <div className="space-y-4">
                {vendor.signatureDishes.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl backdrop-blur-sm group hover:bg-white transition-all shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-muted overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-[10px] opacity-40 uppercase tracking-widest font-black">{item.category}</p>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        onClick={() => onAddToCart(item, vendor.name)}
                        size="sm" 
                        className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest transition-transform"
                      >
                         Add ₹{item.price}
                      </Button>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
               <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Eco Practices</h4>
                 <div className="flex flex-wrap gap-2">
                    {vendor.ecoPractices.map((practice, idx) => (
                      <Badge key={idx} variant="outline" className="rounded-lg px-3 py-1 text-[10px] font-bold border-foreground/10 bg-white/50">{practice}</Badge>
                    ))}
                 </div>
               </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1 rounded-2xl h-14 font-black uppercase tracking-widest gap-2">
                <ShoppingBag className="h-5 w-5" />
                Contact Vendor
              </Button>
              <Button size="lg" variant="outline" className="h-14 w-14 rounded-2xl">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
