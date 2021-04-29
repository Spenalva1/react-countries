import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const THEME_LOCAL_KEY = 'theme-local';

const lightTheme = {
  mode: 'light',
  elements: 'hsl(0, 0%, 100%)',
  bg: 'hsl(0, 0%, 98%)',
  text: 'hsl(200, 15%, 8%)',
};

const darkTheme = {
  mode: 'dark',
  elements: 'hsl(209, 23%, 22%)',
  bg: 'hsl(207, 26%, 17%)',
  text: 'hsl(0, 0%, 100%)',
};

export interface Theme {
  elements: string;
  bg: string;
  text: string;
}

const LocalStateContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});
const LocalStateProvider = LocalStateContext.Provider;

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    const newTheme = theme.mode === 'light' ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem(THEME_LOCAL_KEY, newTheme.mode);
  };

  useEffect(() => {
    const localTheme = localStorage.getItem(THEME_LOCAL_KEY);
    setTheme(localTheme === 'dark' ? darkTheme : lightTheme);
    console.log('hola');
  }, []);

  return (
    <LocalStateProvider value={{ theme, toggleTheme }}>
      {children}
    </LocalStateProvider>
  );
};

// make a custom hook for accessing the theme state
const useTheme = () => {
  const all = useContext(LocalStateContext);
  return all;
};

export { ThemeProvider, useTheme };
