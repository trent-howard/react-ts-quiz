import { useState, useEffect } from 'react';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

function getCurrentTheme(): Theme {
  if (
    Object.values<string>(Theme).includes(localStorage.getItem('theme') || '')
  ) {
    return localStorage.getItem('theme') as Theme;
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return Theme.DARK;
  }
  return Theme.LIGHT;
}

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme());

  useEffect(() => {
    const root = window.document.documentElement;
    console.log(theme);
    if (theme === Theme.DARK) {
      root.classList.add(Theme.DARK);
    } else {
      root.classList.remove(Theme.DARK);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  return toggleTheme;
}
