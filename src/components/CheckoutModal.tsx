import * as React from 'react';
import { X, MapPin, Phone, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

export function CheckoutModal({ isOpen, onClose, total }: CheckoutModalProps) {
  const [step, setStep] = React.useState<'details' | 'success'>('details');
  const [formData, setFormData] = React.useState({
    name: '',
    address: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-card rounded-[2.5rem] shadow-2xl border border-foreground/5 overflow-hidden p-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 opacity-40 hover:opacity-100 transition-opacity"
            >
              <X className="h-5 w-5" />
            </button>

            {step === 'details' ? (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-serif font-bold italic mb-2">Delivery Details</h2>
                  <p className="text-[10px] uppercase font-black tracking-widest text-primary opacity-60">
                    Nearly there! Where should we bring your clean basket?
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30" />
                    <Input 
                      required
                      placeholder="Full Name" 
                      className="pl-12 h-14 rounded-2xl bg-muted/50 border-none focus-visible:ring-primary"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30" />
                    <Input 
                      required
                      type="tel"
                      placeholder="Mobile Number" 
                      className="pl-12 h-14 rounded-2xl bg-muted/50 border-none focus-visible:ring-primary"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-4 w-4 opacity-30" />
                    <textarea 
                      required
                      placeholder="Delivery Address" 
                      className="w-full min-h-[100px] pl-12 pt-4 rounded-2xl bg-muted/50 border-none focus-visible:ring-primary resize-none text-sm"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div className="pt-6 border-t border-foreground/5 mt-6">
                    <div className="flex justify-between text-xl font-serif font-bold italic mb-6">
                      <span>Amount Due</span>
                      <span>₹{total}</span>
                    </div>
                    <Button 
                      type="submit"
                      className="w-full h-16 rounded-2xl text-sm font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary/20 group"
                    >
                      Confirm Order
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </motion.div>
                <h2 className="text-3xl font-serif font-bold italic mb-4">Order Placed!</h2>
                <p className="text-sm font-medium opacity-60 leading-relaxed mb-10">
                  Thank you, {formData.name.split(' ')[0]}. Your clean order is being processed by our vendors. We'll notify you once it's out for delivery.
                </p>
                <Button 
                  onClick={onClose}
                  variant="outline"
                  className="w-full h-14 rounded-2xl border-foreground/10 font-bold uppercase tracking-widest"
                >
                  Back to Marketplace
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
