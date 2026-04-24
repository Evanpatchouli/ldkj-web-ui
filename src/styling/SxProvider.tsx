import * as React from "react";

export type SxTheme = Record<string, unknown>;

const defaultTheme: SxTheme = {};

const SxThemeContext = React.createContext<SxTheme>(defaultTheme);

export type SxProviderProps = {
  theme?: SxTheme;
  children?: React.ReactNode;
};

export function SxProvider({ theme, children }: SxProviderProps) {
  const parentTheme = React.useContext(SxThemeContext);
  const mergedTheme = React.useMemo(
    () => ({ ...parentTheme, ...theme }),
    [parentTheme, theme],
  );

  return (
    <SxThemeContext.Provider value={mergedTheme}>{children}</SxThemeContext.Provider>
  );
}

export function useSxTheme<T extends SxTheme = SxTheme>() {
  return React.useContext(SxThemeContext) as T;
}

export function createTheme<T extends SxTheme>(theme: T) {
  return theme;
}

