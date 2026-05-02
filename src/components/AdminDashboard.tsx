import * as React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ShoppingBag, Leaf, Globe, ArrowUpRight, DollarSign, Package, Users } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, LineChart, Line 
} from 'recharts';
import { Button } from '@/components/ui/button';

const SALES_DATA = [
  { name: 'Mon', value: 45000 },
  { name: 'Tue', value: 52000 },
  { name: 'Wed', value: 48000 },
  { name: 'Thu', value: 61000 },
  { name: 'Fri', value: 55000 },
  { name: 'Sat', value: 72000 },
  { name: 'Sun', value: 85000 },
];

const IMPACT_DATA = [
  { month: 'Jan', plastic: 120, carbon: 450 },
  { month: 'Feb', plastic: 150, carbon: 520 },
  { month: 'Mar', plastic: 180, carbon: 610 },
  { month: 'Apr', plastic: 240, carbon: 750 },
];

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <p className="text-[10px] uppercase font-black tracking-[0.4em] text-primary mb-4 opacity-60">System Administrator</p>
          <h1 className="text-5xl font-serif font-bold italic tracking-tight">Marketplace Command Centre</h1>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Net Revenue', value: '₹4.2M', trend: '+12.5%', icon: DollarSign },
            { label: 'Active Orders', value: '1,240', trend: '+8.2%', icon: Package },
            { label: 'Vendors Online', value: '242/250', trend: 'Healthy', icon: ShoppingBag },
            { label: 'Saved Bags', value: '45.2K', trend: '+15%', icon: Leaf },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/50 backdrop-blur-xl border border-foreground/5 rounded-[2rem] p-8 shadow-sm group hover:border-primary/20 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <stat.icon className="h-6 w-6 text-foreground/50 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-lg">
                  {stat.trend}
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-serif font-black italic">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Revenue Chart */}
          <div className="bg-card/30 backdrop-blur-xl border border-foreground/5 rounded-[3rem] p-10">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-serif font-bold italic mb-1">Revenue Performance</h3>
                <p className="text-xs font-medium opacity-40">Weekly gross marketplace value (GMV)</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-2xl"><ArrowUpRight className="h-5 w-5" /></Button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="oklch(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="oklch(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sustainability Tracking */}
          <div className="bg-card/30 backdrop-blur-xl border border-foreground/5 rounded-[3rem] p-10">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-serif font-bold italic mb-1">Impact Metrics</h3>
                <p className="text-xs font-medium opacity-40">Cumulative carbon & plastic reduction (KG)</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Carbon</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-foreground/20" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Plastic</span>
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={IMPACT_DATA}>
                  <Tooltip 
                    cursor={{fill: 'oklch(var(--foreground) / 0.05)', radius: [10, 10, 0, 0]}}
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="carbon" fill="oklch(var(--primary))" radius={[10, 10, 0, 0]} barSize={20} />
                  <Bar dataKey="plastic" fill="oklch(var(--foreground) / 0.2)" radius={[10, 10, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card/30 backdrop-blur-xl border border-foreground/5 rounded-[3rem] p-10 overflow-hidden">
          <h3 className="text-2xl font-serif font-bold italic mb-8">Live Transaction Stream</h3>
          <div className="space-y-6">
            {[
              { id: '#ORD-9023', user: 'Ananya Sharma', amount: '₹1,240', status: 'Processing', vendor: 'Mitti Ke Swad' },
              { id: '#ORD-9022', user: 'Rahul Varma', amount: '₹850', status: 'Out for Delivery', vendor: 'Heritage Grains' },
              { id: '#ORD-9021', user: 'Priya Iyer', amount: '₹2,100', status: 'Completed', vendor: 'Pure Farm' },
            ].map((order, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-foreground/5 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-black text-xs text-primary">
                    {order.user[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm tracking-tight">{order.user}</p>
                    <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">{order.id} • {order.vendor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 justify-between md:justify-end">
                  <div className="text-right">
                    <p className="font-serif font-bold italic">{order.amount}</p>
                    <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">Amount Paid</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    order.status === 'Completed' ? 'bg-primary/20 text-primary' : 'bg-foreground/10 text-foreground/50'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
