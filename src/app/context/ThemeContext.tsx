// src/context/ThemeContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";

// Define the shape of your theme context
interface ThemeContextType {
  theme: string;
  setTheme: (themeName: string) => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the props for the ThemeProvider, including optional value for overriding
interface ThemeProviderProps {
  children: ReactNode;
  value?: ThemeContextType;
}

// Create a custom hook for using the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Create the ThemeProvider component
export const ThemeProvider = ({ children, value }: ThemeProviderProps) => {
  // Initialize state only if value is not provided
  const [themeState, setThemeState] = useState<string>("sunset");

  // Memoize setTheme to keep the function reference stable
  const setTheme = useCallback(
    (themeName: string) => {
      if (value && value.setTheme) {
        value.setTheme(themeName);
      } else {
        setThemeState(themeName);
      }
    },
    [value]
  );

  // If value is provided use it, otherwise use the state
  const theme = value?.theme || themeState;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
