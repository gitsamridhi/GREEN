export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  fullStory: string;
  ecoPractices: string[];
  rating: number;
  tags: string[];
  image: string;
  location: string;
  signatureDishes: Product[];
  featuredProduct?: Product;
}

export const VENDORS: Vendor[] = [
  {
    id: '1',
    name: 'Mitti Ke Swad',
    location: 'Indiranagar, Bengaluru',
    description: 'Traditional organic produce from local village farms.',
    fullStory: "Started by Rameshwar ji in 2012, Mitti Ke Swad brings the authentic taste of rural Karnataka to your table. We work with 40+ small-scale farmers who use ancient Vedic farming techniques, ensuring that every grain of ragi and every drop of ghee is infused with the purity of the earth.",
    ecoPractices: [
      "Zero plastic usage in storage",
      "Traditional clay-pot processing",
      "Solar-powered grinding mills",
      "Direct-to-farmer fair trade"
    ],
    signatureDishes: [
      { id: 'item-1', name: 'Kodo Millet Bowl', price: 249, category: 'Organic', description: 'Traditional ancient grains sourced from tribal farms.', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800' },
      { id: 'item-2', name: 'A2 Desi Cow Ghee', price: 850, category: 'Dairies', description: 'Bilona method ghee from grass-fed Gir cows.', image: 'https://images.unsplash.com/photo-1589927986019-30290b981ab9?auto=format&fit=crop&q=80&w=800' }
    ],
    rating: 4.8,
    tags: ['Organic', 'Eco-friendly', 'Local', 'Dairies'],
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    name: 'Harit Bhojan',
    location: 'Koramangala, Bengaluru',
    description: 'Clean, home-cooked food served in biodegradable packaging.',
    fullStory: "Harit Bhojan is a collective of home chefs dedicated to 'Shuddh' eating. We believe that food is medicine. Our kitchens use zero refined oils, zero white sugar, and absolutely no preservatives. Every meal is a tribute to India's diverse culinary heritage, served with love and environmental responsibility.",
    ecoPractices: [
      "Compostable leaf-based packaging",
      "Carbon-neutral bicycle delivery",
      "Zero-waste kitchen operations",
      "Rainwater harvesting in all facilities"
    ],
    signatureDishes: [
      { id: 'sd3', name: 'Sattvik Thali', price: 320, category: 'Organic', description: 'A balanced meal with seasonal greens, sprouts, and multi-grain rotis.', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&q=80&w=800' },
      { id: 'sd4', name: 'Millet Khichdi', price: 180, category: 'Clean Food', description: 'Foxtail millet cooked with organic moong dal and desi ghee.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800' }
    ],
    rating: 4.5,
    tags: ['Home-cooked', 'Clean Food', 'Plastic-free', 'Organic'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Sattvik Spices',
    location: 'Jayanagar, Bengaluru',
    description: 'Stone-ground spices without any synthetic additives.',
    fullStory: "We are on a mission to reclaim the potency of Indian spices. Commercial grinding generates heat that destroys essential oils. At Sattvik Spices, we use slow, cold stone-grinding techniques that keep the nutrients and aroma intact. No fillers, no colors, just the spirit of the spice.",
    ecoPractices: [
      "Reusable glass jar packaging",
      "Sourced from pesticide-free clusters",
      "Traditional wood-fired drying",
      "No synthetic anti-caking agents"
    ],
    signatureDishes: [
      { id: 'item-3', name: 'Stone-Ground Turmeric', price: 180, category: 'Clean Food', description: 'High-curcumin Lakadong turmeric with no fillers.', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800' },
      { id: 'sd6', name: 'Cold Pressed Black Mustard', price: 180, category: 'Clean Food', description: 'Vibrant and pungent, perfect for traditional tempering.', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300' }
    ],
    rating: 4.9,
    tags: ['Spices', 'Cold-pressed', 'Natural', 'Clean Food'],
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
  }
];

export const CATEGORIES = ['All', 'Organic', 'Clean Food', 'Local', 'Dairies'];
