import * as React from 'react';
import { Leaf, Moon, Sun, ShoppingCart, User, Menu, Palette, LayoutDashboard, LogOut } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AutoSuggestSearch } from './AutoSuggestSearch';
import { useTheme } from './ThemeContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, login, logout } = useAuth();
  const { cart, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-foreground/5 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto px-8 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-12 shrink-0">
          <div 
            onClick={() => user?.isAdmin ? navigate('/') : navigate('/marketplace')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Leaf className="h-4 w-4" />
            </div>
            <span className="font-serif font-bold text-2xl tracking-tighter text-primary uppercase flex items-center">
              GREEN<span className="text-[#795548] ml-0.5">.</span>
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-1 text-sm font-bold border-l border-foreground/10 pl-8 opacity-60">
             <span>Bengaluru, Indiranagar</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 hidden md:block">
          <AutoSuggestSearch />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 font-bold text-sm">
          <div className="hidden lg:flex gap-8 mr-4 opacity-60">
            <Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
            <a href="#" className="hover:text-primary transition-colors">Our Farmers</a>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-10 w-10 rounded-full hover:bg-white/50")}>
                {theme === 'light' ? <Sun className="h-5 w-5" /> : 
                 theme === 'dark' ? <Moon className="h-5 w-5" /> : 
                 <Palette className="h-5 w-5" />}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl border-none shadow-2xl p-2">
                <DropdownMenuItem onClick={() => setTheme('light')} className="rounded-xl">
                  <Sun className="mr-2 h-4 w-4" /> Light Mode
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')} className="rounded-xl">
                  <Moon className="mr-2 h-4 w-4" /> Dark Mode
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('eco-green')} className="rounded-xl">
                  <Leaf className="mr-2 h-4 w-4" /> Eco Forest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cursor-pointer">
                    <div className="flex items-center gap-3 bg-foreground/5 pl-1 pr-3 py-1 rounded-full border border-foreground/5 hover:border-primary/20 transition-all">
                      <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full border border-background" />
                      <span className="hidden sm:inline-block max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                    </div>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl border-none shadow-2xl p-2">
                  {user.isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin-dashboard')} className="rounded-xl gap-2 h-12 font-bold">
                      <LayoutDashboard className="h-4 w-4" /> Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout} className="rounded-xl h-12 gap-2 text-destructive font-bold focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={login}
                  className="rounded-full px-6 font-bold uppercase tracking-widest text-xs"
                >
                  Sign In
                </Button>
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsCartOpen(true)}
                className="h-10 w-10 rounded-full bg-foreground/5 hover:bg-white text-foreground relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-black"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Mobile Search - Visible only on small screens */}
      <div className="px-4 pb-3 md:hidden">
        <AutoSuggestSearch />
      </div>
    </nav>
  );
}
