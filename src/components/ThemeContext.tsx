import * as React from 'react';

type Theme = 'light' | 'dark' | 'eco-green';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    const saved = localStorage.getItem('green-theme');
    return (saved as Theme) || 'light';
  });

  React.useEffect(() => {
    localStorage.setItem('green-theme', theme);
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'eco-green');
    root.classList.add(theme);
    
    // Apply Editorial Aesthetic signature colors
    if (theme === 'dark') {
      root.style.setProperty('--background', '0 0% 10%'); // Deep nearly black
    } else if (theme === 'eco-green') {
      root.style.setProperty('--background', '102 44% 12%'); // Deep Forest Green
    } else {
      root.style.setProperty('--background', '34 33% 90%'); // Editorial Beige
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
