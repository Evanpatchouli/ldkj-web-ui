import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  useTheme,
  type SxTheme,
  type ThemeInput,
} from "./theme";

export type SxProviderProps = {
  theme?: ThemeInput;
  children?: React.ReactNode;
};

export function SxProvider({ theme, children }: SxProviderProps) {
  return (
    <ThemeProvider theme={theme} scope="none">
      {children}
    </ThemeProvider>
  );
}

export function useSxTheme<T extends SxTheme = SxTheme>() {
  return useTheme<T>();
}

export { createTheme };
export type { SxTheme };
