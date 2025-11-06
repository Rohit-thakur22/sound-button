// components/ThemeBodyClass.jsx
'use client';

import { useContext, useEffect } from 'react';
import { ThemeContext } from '@/components/context/theme-context';

export default function ThemeBodyClass() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return null; // No UI, just managing the body class
}
