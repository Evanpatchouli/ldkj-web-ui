import * as React from "react";

type CssVarName = `--${string}`;

export type ThemeMode = "light" | "dark" | "system";

export type ThemeColors = {
  background: string;
  foreground: string;
  surface: string;
  surfaceForeground: string;
  surfaceMuted: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
  primary: string;
  primaryForeground: string;
  primaryHover: string;
  secondary: string;
  secondaryForeground: string;
  secondaryHover: string;
  accent: string;
  accentForeground: string;
  accentHover: string;
  info: string;
  infoForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  danger: string;
  dangerForeground: string;
  overlay: string;
  inverse: string;
  inverseForeground: string;
};

export type ThemeRadii = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
};

export type ThemeShadows = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  popover: string;
  modal: string;
};

export type ThemeZIndex = {
  dropdown: number;
  sticky: number;
  drawer: number;
  modal: number;
  notification: number;
  toast: number;
};

export type ThemeTokens = {
  mode?: ThemeMode;
  colors: ThemeColors;
  radii: ThemeRadii;
  shadows: ThemeShadows;
  zIndex: ThemeZIndex;
  cssVars?: Partial<Record<CssVarName, string | number>>;
  [key: string]: unknown;
};

type PartialThemeObject<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown>
    ? PartialThemeObject<T[K]>
    : T[K];
};

export type ThemeInput = PartialThemeObject<ThemeTokens> &
  Record<string, unknown>;

export type Theme = ThemeTokens;
export type SxTheme = ThemeInput;

export const defaultLightTheme: Theme = {
  mode: "light",
  colors: {
    background: "hsl(0 0% 100%)",
    foreground: "hsl(222.2 84% 4.9%)",
    surface: "hsl(0 0% 100%)",
    surfaceForeground: "hsl(222.2 84% 4.9%)",
    surfaceMuted: "hsl(210 40% 98%)",
    muted: "hsl(210 40% 96.1%)",
    mutedForeground: "hsl(215.4 16.3% 46.9%)",
    border: "hsl(214.3 31.8% 91.4%)",
    input: "hsl(214.3 31.8% 91.4%)",
    ring: "hsl(222.2 84% 4.9%)",
    primary: "hsl(221.2 83.2% 53.3%)",
    primaryForeground: "hsl(210 40% 98%)",
    primaryHover: "hsl(224.3 76.3% 48%)",
    secondary: "hsl(187 92% 42%)",
    secondaryForeground: "hsl(210 40% 98%)",
    secondaryHover: "hsl(188.7 94.5% 36.5%)",
    accent: "hsl(210 40% 96.1%)",
    accentForeground: "hsl(222.2 47.4% 11.2%)",
    accentHover: "hsl(210 40% 92%)",
    info: "hsl(221.2 83.2% 53.3%)",
    infoForeground: "hsl(210 40% 98%)",
    success: "hsl(142.1 70.6% 45.3%)",
    successForeground: "hsl(0 0% 100%)",
    warning: "hsl(38 92% 50%)",
    warningForeground: "hsl(0 0% 100%)",
    danger: "hsl(0 84.2% 60.2%)",
    dangerForeground: "hsl(210 40% 98%)",
    overlay: "rgb(0 0 0 / 45%)",
    inverse: "hsl(222.2 47.4% 11.2%)",
    inverseForeground: "hsl(210 40% 98%)",
  },
  radii: {
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  shadows: {
    xs: "0 1px 2px rgb(15 23 42 / 8%)",
    sm: "0 1px 3px rgb(15 23 42 / 10%), 0 1px 2px rgb(15 23 42 / 6%)",
    md: "0 8px 22px rgb(15 23 42 / 12%), 0 2px 6px rgb(15 23 42 / 8%)",
    lg: "0 14px 34px rgb(15 23 42 / 12%), 0 3px 10px rgb(15 23 42 / 8%)",
    xl: "0 24px 60px rgb(15 23 42 / 18%)",
    popover: "0 10px 30px rgb(15 23 42 / 12%), 0 2px 8px rgb(15 23 42 / 8%)",
    modal: "0 24px 72px rgb(15 23 42 / 22%)",
  },
  zIndex: {
    dropdown: 50,
    sticky: 100,
    drawer: 1200,
    modal: 1300,
    notification: 10002,
    toast: 10001,
  },
};

export const defaultDarkTheme: Theme = mergeTheme(defaultLightTheme, {
  mode: "dark",
  colors: {
    background: "#020817",
    foreground: "#f8fafc",
    surface: "#020817",
    surfaceForeground: "#f8fafc",
    surfaceMuted: "#1e293b",
    muted: "#1e293b",
    mutedForeground: "#94a3b8",
    border: "#1e293b",
    input: "#1e293b",
    ring: "#cbd5e1",
    primary: "hsl(217.2 91.2% 59.8%)",
    primaryForeground: "hsl(222.2 47.4% 11.2%)",
    primaryHover: "hsl(213.1 93.9% 67.8%)",
    secondary: "hsl(187 92% 42%)",
    secondaryForeground: "#f8fafc",
    secondaryHover: "hsl(188.7 94.5% 36.5%)",
    accent: "hsl(217.2 32.6% 17.5%)",
    accentForeground: "#f8fafc",
    accentHover: "hsl(215 27.9% 16.9%)",
    overlay: "rgb(0 0 0 / 62%)",
    inverse: "#f8fafc",
    inverseForeground: "#0f172a",
  },
});

const ThemeContext = React.createContext<ThemeInput>({});

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mergeTheme<TBase extends ThemeInput, TOverride extends ThemeInput>(
  base: TBase,
  override?: TOverride,
): TBase & TOverride {
  if (!override) return base as TBase & TOverride;

  const merged: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(override)) {
    const current = merged[key];
    merged[key] =
      isPlainObject(current) && isPlainObject(value)
        ? mergeTheme(current, value)
        : value;
  }

  return merged as TBase & TOverride;
}

function pickBaseTheme(mode: ThemeMode | undefined) {
  return mode === "dark" ? defaultDarkTheme : defaultLightTheme;
}

export function createTheme<T extends ThemeInput>(theme: T): T {
  return theme;
}

export function useTheme<T extends ThemeInput = ThemeInput>() {
  return React.useContext(ThemeContext) as T;
}

export function themeToCssVars(theme: ThemeInput): React.CSSProperties {
  const tokens = theme as Theme;
  const colors = tokens.colors ?? {};
  const radii = tokens.radii ?? {};
  const shadows = tokens.shadows ?? {};
  const zIndex = tokens.zIndex ?? {};
  const vars: Record<string, string | number | undefined> = {
    "--ldkj-color-background": colors.background,
    "--ldkj-color-foreground": colors.foreground,
    "--ldkj-color-surface": colors.surface,
    "--ldkj-color-surface-foreground": colors.surfaceForeground,
    "--ldkj-color-surface-muted": colors.surfaceMuted,
    "--ldkj-color-muted": colors.muted,
    "--ldkj-color-muted-foreground": colors.mutedForeground,
    "--ldkj-color-border": colors.border,
    "--ldkj-color-input": colors.input,
    "--ldkj-color-ring": colors.ring,
    "--ldkj-color-primary": colors.primary,
    "--ldkj-color-primary-foreground": colors.primaryForeground,
    "--ldkj-color-primary-hover": colors.primaryHover,
    "--ldkj-color-secondary": colors.secondary,
    "--ldkj-color-secondary-foreground": colors.secondaryForeground,
    "--ldkj-color-secondary-hover": colors.secondaryHover,
    "--ldkj-color-accent": colors.accent,
    "--ldkj-color-accent-foreground": colors.accentForeground,
    "--ldkj-color-accent-hover": colors.accentHover,
    "--ldkj-color-info": colors.info,
    "--ldkj-color-info-foreground": colors.infoForeground,
    "--ldkj-color-success": colors.success,
    "--ldkj-color-success-foreground": colors.successForeground,
    "--ldkj-color-warning": colors.warning,
    "--ldkj-color-warning-foreground": colors.warningForeground,
    "--ldkj-color-danger": colors.danger,
    "--ldkj-color-danger-foreground": colors.dangerForeground,
    "--ldkj-color-overlay": colors.overlay,
    "--ldkj-color-inverse": colors.inverse,
    "--ldkj-color-inverse-foreground": colors.inverseForeground,
    "--ldkj-radius-xs": radii.xs,
    "--ldkj-radius-sm": radii.sm,
    "--ldkj-radius-md": radii.md,
    "--ldkj-radius-lg": radii.lg,
    "--ldkj-radius-xl": radii.xl,
    "--ldkj-radius-full": radii.full,
    "--ldkj-shadow-xs": shadows.xs,
    "--ldkj-shadow-sm": shadows.sm,
    "--ldkj-shadow-md": shadows.md,
    "--ldkj-shadow-lg": shadows.lg,
    "--ldkj-shadow-xl": shadows.xl,
    "--ldkj-shadow-popover": shadows.popover,
    "--ldkj-shadow-modal": shadows.modal,
    "--ldkj-z-dropdown": zIndex.dropdown,
    "--ldkj-z-sticky": zIndex.sticky,
    "--ldkj-z-drawer": zIndex.drawer,
    "--ldkj-z-modal": zIndex.modal,
    "--ldkj-z-notification": zIndex.notification,
    "--ldkj-z-toast": zIndex.toast,
    ...tokens.cssVars,
  };

  return Object.fromEntries(
    Object.entries(vars).filter(([, value]) => value !== undefined),
  ) as React.CSSProperties;
}

function useSystemMode(enabled: boolean) {
  const [systemMode, setSystemMode] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setSystemMode(media.matches ? "dark" : "light");

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [enabled]);

  return systemMode;
}

export type ThemeProviderProps = {
  theme?: ThemeInput;
  mode?: ThemeMode;
  scope?: "local" | "root" | "none";
  children?: React.ReactNode;
};

export function ThemeProvider({
  theme,
  mode,
  scope = "local",
  children,
}: ThemeProviderProps) {
  const parentTheme = useTheme();
  const requestedMode = mode ?? theme?.mode ?? parentTheme.mode ?? "light";
  const systemMode = useSystemMode(requestedMode === "system");
  const resolvedMode = requestedMode === "system" ? systemMode : requestedMode;
  const mergedTheme = React.useMemo(
    () =>
      mergeTheme(
        mergeTheme(pickBaseTheme(resolvedMode), parentTheme),
        mergeTheme({ mode: resolvedMode }, theme),
      ),
    [parentTheme, resolvedMode, theme],
  );
  const cssVars = React.useMemo(() => themeToCssVars(mergedTheme), [mergedTheme]);

  React.useEffect(() => {
    if (scope !== "root" || typeof document === "undefined") return;

    const target = document.documentElement;
    const previous = new Map<string, string>();

    for (const [key, value] of Object.entries(cssVars)) {
      previous.set(key, target.style.getPropertyValue(key));
      target.style.setProperty(key, String(value));
    }
    target.dataset.ldkjTheme = resolvedMode;

    return () => {
      for (const [key, value] of previous) {
        if (value) target.style.setProperty(key, value);
        else target.style.removeProperty(key);
      }
      delete target.dataset.ldkjTheme;
    };
  }, [cssVars, resolvedMode, scope]);

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {scope === "local" ? (
        <div data-ldkj-theme={resolvedMode} style={cssVars}>
          {children}
        </div>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  );
}
