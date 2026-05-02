import * as React from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'motion/react';
import { VENDORS, Vendor } from '@/lib/data';
import { useClickAway } from 'react-use';
import { cn } from '@/lib/utils';

export function AutoSuggestSearch() {
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [results, setResults] = React.useState<Vendor[]>([]);
  const containerRef = React.useRef(null);

  useClickAway(containerRef, () => setIsOpen(false));

  React.useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      const filtered = VENDORS.filter(v => 
        v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
      setIsSearching(false);
      setIsOpen(true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 opacity-30" />
        <Input
          placeholder="Search organic millets, desi ghee, clean snacks..."
          className="pl-14 pr-14 bg-white/40 dark:bg-white/5 border-none focus-visible:ring-primary h-16 rounded-3xl font-medium shadow-sm transition-all focus:bg-white focus:shadow-2xl focus:shadow-primary/5 text-lg w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-40 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (results.length > 0 || isSearching) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 w-full bg-card border rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            <div className="p-2">
              {isSearching ? (
                <div className="flex items-center gap-2 p-3 text-muted-foreground text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching local vendors...
                </div>
              ) : (
                <div className="p-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 pb-2">
                    Vendors Found
                  </p>
                  {results.slice(0, 5).map((vendor) => (
                    <button
                      key={vendor.id}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 w-full p-2 hover:bg-muted rounded-xl transition-colors text-left"
                    >
                      <img 
                        src={vendor.image} 
                        alt="" 
                        className="h-10 w-10 rounded-lg object-cover" 
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-medium text-sm">{vendor.name}</p>
                        <p className="text-xs text-muted-foreground truncate w-48">
                          {vendor.tags.join(', ')}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
