import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Marketplace } from './pages/Marketplace';
import { AuthPage } from './pages/AuthPage';
import { AdminDashboard } from './components/AdminDashboard';
import { CartSheet } from './components/CartSheet';
import { CheckoutModal } from './components/CheckoutModal';
import { Leaf } from 'lucide-react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user || !user.isAdmin) return <Navigate to="/marketplace" replace />;
  return <>{children}</>;
}

function LoadingScreen() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse shadow-2xl shadow-primary/20">
          <Leaf className="h-8 w-8 text-background" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Green is loading...</p>
      </div>
    </div>
  );
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const { cart, updateQuantity, isCartOpen, setIsCartOpen, isCheckoutOpen, setIsCheckoutOpen, total } = useCart();
  const location = useLocation();
  const isExcluded = location.pathname === '/' || location.pathname === '/auth';

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {!isExcluded && <Navbar />}
      
      <CartSheet 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onUpdateQuantity={updateQuantity} 
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        total={total > 0 ? total + 45 : 0} 
      />

      {children}

      {!isExcluded && (
        <footer className="bg-background border-t py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
              <div className="max-w-xs">
                <div className="flex gap-2 items-center mb-4">
                  <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                    <Leaf className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-xl uppercase tracking-tighter flex items-center">
                    GREEN<span className="text-[#795548] ml-0.5">.</span>
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  India's first conscious food marketplace. Support local, eat healthy, stay green.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">The Manifesto</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Support</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">Clean Guarantee</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">
              <p>© 2026 GREEN ECO TECH PVT LTD. MADE WITH PRIDE IN BHARAT.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <MainLayout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route 
                  path="/marketplace" 
                  element={
                    <ProtectedRoute>
                      <Marketplace /> 
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-dashboard" 
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </MainLayout>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
