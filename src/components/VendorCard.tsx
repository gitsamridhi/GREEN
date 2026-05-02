import * as React from 'react';
import { Star, Clock, Heart, ShoppingBag } from 'lucide-react';
import { Vendor } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

interface VendorCardProps {
  vendor: Vendor;
  index: number;
  onSelect: (vendor: Vendor) => void;
}

export function VendorCard({ vendor, index, onSelect }: VendorCardProps) {
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <Card 
      className="group overflow-hidden rounded-[2.5rem] border-none bg-card/40 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 cursor-pointer h-full"
      onClick={() => onSelect(vendor)}
    >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img 
            src={vendor.image} 
            alt={vendor.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-5 right-5 flex flex-col gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg shadow-black/5"
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-accent text-accent' : ''}`} />
            </Button>
          </div>
          <div className="absolute top-5 left-5">
             <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black shadow-lg shadow-black/5">
               {vendor.rating} ★
             </div>
          </div>
        </div>
        <CardContent className="p-8">
          <h3 className="font-serif text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors leading-tight italic">
            {vendor.name}
          </h3>
          <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">
            {vendor.tags[0]} • {vendor.tags[1] || 'Local'}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              22 mins away
            </div>
            <ShoppingBag className="h-4 w-4 opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all" />
          </div>
        </CardContent>
      </Card>
  );
}
