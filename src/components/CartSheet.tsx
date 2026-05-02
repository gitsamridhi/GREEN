import * as React from 'react';
import { X, ShoppingBag, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '@/lib/data';

interface CartItem extends Product {
  quantity: number;
  vendorName: string;
}

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

export function CartSheet({ isOpen, onClose, items, onUpdateQuantity, onCheckout }: CartSheetProps) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-card h-full shadow-2xl flex flex-col border-l border-foreground/5 p-8"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-serif font-bold italic">Your Bag</h2>
              </div>
              <button 
                onClick={onClose}
                className="h-10 w-10 bg-muted/50 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag className="h-16 w-16 mb-4" />
                  <p className="text-sm font-bold uppercase tracking-widest text-balance max-w-[150px]">
                    Your clean bag is empty
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 group p-2 rounded-2xl hover:bg-muted/30 transition-colors"
                  >
                    <div className="h-20 w-20 rounded-xl overflow-hidden bg-muted shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
                        {item.vendorName}
                      </p>
                      <h3 className="font-bold text-sm mb-2 truncate">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-sm">₹{item.price}</p>
                        <div className="flex items-center gap-3 bg-muted px-3 py-1 rounded-full">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-black">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="pt-8 mt-auto border-t space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold opacity-40 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-xs font-bold opacity-40 uppercase tracking-widest">
                  <span>Eco-Delivery</span>
                  <span>₹45</span>
                </div>
                <div className="flex justify-between text-xl font-serif font-bold italic pt-4">
                  <span>Total</span>
                  <span>₹{total > 0 ? total + 45 : 0}</span>
                </div>
              </div>

              <Button 
                onClick={onCheckout}
                disabled={items.length === 0}
                className="w-full h-16 rounded-2xl text-sm font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary/20 group"
              >
                Order Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
