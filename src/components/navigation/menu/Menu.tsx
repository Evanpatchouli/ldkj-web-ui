import * as React from "react";
import type { CSSProperties, ElementType, ReactElement } from "react";
import { Icon, type IconProps } from "@/components/data-display/icon";
import { Box, type BoxProps } from "@/components/layout/box";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type MenuKey = string;

type StyledProps = {
  className?: string;
  class?: string;
  style?: CSSProperties;
  sx?: SxProps;
};

type MenuChangeInfo = {
  key: MenuKey;
  keys: MenuKey[];
};

export type MenuItemColors = {
  itemText?: string;
  itemBackground?: string;
  itemHoverText?: string;
  itemHoverBackground?: string;
  itemSelectedText?: string;
  itemSelectedBackground?: string;
  itemSelectedHoverText?: string;
  itemDisabledText?: string;
};

export type MenuRef = {
  select: (key: MenuKey) => void;
  unselect: (key: MenuKey) => void;
  open: (key: MenuKey) => void;
  close: (key: MenuKey) => void;
  toggleOpen: (key: MenuKey) => void;
  getSelectedKeys: () => MenuKey[];
  getOpenKeys: () => MenuKey[];
};

/**
 * 创建 `Menu` 的命令式控制引用，适合配合 `menuRef` 属性使用。
 */
export function useMenuRef() {
  return React.useRef<MenuRef>(null);
}

type MenuContextValue = {
  selectedKeys: MenuKey[];
  openKeys: MenuKey[];
  multiple: boolean;
  accordion: boolean;
  indent: number;
  itemGap: number | string;
  selectKey: (key: MenuKey, unselectOnClick?: boolean) => void;
  toggleOpenKey: (key: MenuKey) => void;
  registerSub: (key: MenuKey, parentKey: MenuKey | null) => () => void;
};

const MenuContext = React.createContext<MenuContextValue | null>(null);
const MenuLevelContext = React.createContext(0);
const MenuParentKeyContext = React.createContext<MenuKey | null>(null);

function useMenuContext(componentName: string) {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error(`${componentName} must be used within Menu.`);
  }
  return context;
}

function useControllableKeys(options: {
  value?: MenuKey[];
  defaultValue?: MenuKey[];
  onChange?: (keys: MenuKey[], info: MenuChangeInfo) => void;
}) {
  const { value, defaultValue = [], onChange } = options;
  const [innerValue, setInnerValue] = React.useState<MenuKey[]>(defaultValue);
  const controlled = value !== undefined;
  const keys = controlled ? value : innerValue;

  const setKeys = React.useCallback(
    (nextKeys: MenuKey[], changedKey: MenuKey) => {
      if (!controlled) {
        setInnerValue(nextKeys);
      }
      onChange?.(nextKeys, { key: changedKey, keys: nextKeys });
    },
    [controlled, onChange],
  );

  return [keys, setKeys] as const;
}

function toCssLength(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

function resolveMenuColorStyle(
  colors?: MenuItemColors,
): CSSProperties | undefined {
  if (!colors) return undefined;

  const style: Record<string, string> = {};
  if (colors.itemText) style["--menu-item-text"] = colors.itemText;
  if (colors.itemBackground) style["--menu-item-bg"] = colors.itemBackground;
  if (colors.itemHoverText)
    style["--menu-item-hover-text"] = colors.itemHoverText;
  if (colors.itemHoverBackground)
    style["--menu-item-hover-bg"] = colors.itemHoverBackground;
  if (colors.itemSelectedText)
    style["--menu-item-selected-text"] = colors.itemSelectedText;
  if (colors.itemSelectedBackground)
    style["--menu-item-selected-bg"] = colors.itemSelectedBackground;
  if (colors.itemSelectedHoverText)
    style["--menu-item-selected-hover-text"] = colors.itemSelectedHoverText;
  if (colors.itemDisabledText)
    style["--menu-item-disabled-text"] = colors.itemDisabledText;

  return Object.keys(style).length ? (style as CSSProperties) : undefined;
}

function getItemKey(item: MenuItemConfig, indexPath: number[]) {
  return item.key ?? item.href ?? indexPath.join("-");
}

function isActivationKey(event: React.KeyboardEvent) {
  return event.key === "Enter" || event.key === " ";
}

function MenuList(props: React.ComponentPropsWithoutRef<"ul"> & StyledProps) {
  const { className, class: legacyClass, sx, style, ...restProps } = props;
  const context = React.useContext(MenuContext);
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const resetListStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: context ? toCssLength(context.itemGap) : undefined,
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  return (
    <ul
      className={cn("m-0 list-none p-0", sxClassName, className, legacyClass)}
      style={mergeSxStyle(resetListStyle, style, sxInlineStyle)}
      {...restProps}
    />
  );
}

MenuList.displayName = "Menu.List";

export type MenuItemProps<T extends ElementType = "button"> = Omit<
  React.ComponentPropsWithoutRef<T>,
  "as" | "className" | "style" | "children" | "disabled" | "onClick"
> &
  StyledProps & {
    itemKey: MenuKey;
    label?: React.ReactNode;
    icon?: IconProps["name"];
    iconProps?: Omit<IconProps, "name">;
    href?: string;
    component?: T;
    disabled?: boolean;
    selected?: boolean;
    unselectOnClick?: boolean;
    onClick?: React.MouseEventHandler<Element>;
    onSelect?: (key: MenuKey) => void;
    children?: React.ReactNode;
  };

function MenuItem<T extends ElementType = "button">(props: MenuItemProps<T>) {
  const {
    itemKey,
    label,
    icon,
    iconProps,
    href,
    component,
    disabled = false,
    selected: selectedProp,
    unselectOnClick,
    onClick,
    onSelect,
    className,
    class: legacyClass,
    sx,
    style,
    children,
    ...restProps
  } = props;
  const context = useMenuContext("Menu.Item");
  const level = React.useContext(MenuLevelContext);
  const selected = selectedProp ?? context.selectedKeys.includes(itemKey);
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const Comp = (component ?? (href ? "a" : "button")) as ElementType;
  const isButton = Comp === "button";

  const handleSelect = (event: React.MouseEvent<Element>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    context.selectKey(itemKey, unselectOnClick);
    onSelect?.(itemKey);
    onClick?.(event);
  };

  return (
    <li role="none" style={{ listStyle: "none", margin: 0 }}>
      <Comp
        className={cn(
          "flex min-h-10 w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm leading-5 text-[color:var(--menu-item-text,var(--ldkj-color-foreground))] transition-colors hover:bg-[color:var(--menu-item-hover-bg,var(--ldkj-color-accent))] hover:text-[color:var(--menu-item-hover-text,var(--ldkj-color-accent-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)]",
          selected &&
            "bg-[color:var(--menu-item-selected-bg,var(--ldkj-color-primary))] text-[color:var(--menu-item-selected-text,var(--ldkj-color-primary-foreground))] hover:bg-[color:var(--menu-item-selected-bg,var(--ldkj-color-primary))] hover:text-[color:var(--menu-item-selected-hover-text,var(--ldkj-color-primary-foreground))]",
          disabled &&
            "cursor-not-allowed text-[color:var(--menu-item-disabled-text,var(--ldkj-color-muted-foreground))] opacity-70 hover:bg-transparent",
          sxClassName,
          className,
          legacyClass,
        )}
        style={mergeSxStyle(
          {
            paddingLeft: `calc(0.75rem + ${level} * ${toCssLength(context.indent)})`,
          },
          style,
          sxInlineStyle,
        )}
        href={href}
        type={isButton ? "button" : undefined}
        role="menuitem"
        aria-disabled={disabled || undefined}
        aria-current={selected ? "page" : undefined}
        data-menu-item-key={itemKey}
        data-selected={selected ? "" : undefined}
        disabled={isButton ? disabled : undefined}
        onClick={handleSelect}
        {...restProps}
      >
        {icon ? (
          <Icon name={icon} size={18} className="shrink-0" {...iconProps} />
        ) : null}
        <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      </Comp>
    </li>
  );
}

MenuItem.displayName = "Menu.Item";

export type MenuSubProps = Omit<
  React.ComponentPropsWithoutRef<"li">,
  "className" | "style" | "children" | "title"
> &
  StyledProps & {
    itemKey: MenuKey;
    label: React.ReactNode;
    icon?: IconProps["name"];
    iconProps?: Omit<IconProps, "name">;
    disabled?: boolean;
    children?: React.ReactNode;
  };

function MenuSub(props: MenuSubProps) {
  const {
    itemKey,
    label,
    icon,
    iconProps,
    disabled = false,
    className,
    class: legacyClass,
    sx,
    style,
    children,
    ...restProps
  } = props;
  const context = useMenuContext("Menu.Sub");
  const level = React.useContext(MenuLevelContext);
  const parentKey = React.useContext(MenuParentKeyContext);
  const open = context.openKeys.includes(itemKey);
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  React.useEffect(
    () => context.registerSub(itemKey, parentKey),
    [context, itemKey, parentKey],
  );

  return (
    <li
      className={cn(sxClassName, className, legacyClass)}
      style={mergeSxStyle(
        {
          display: "flex",
          flexDirection: "column",
          gap: toCssLength(context.itemGap),
          listStyle: "none",
          margin: 0,
        },
        style,
        sxInlineStyle,
      )}
      {...restProps}
    >
      <button
        type="button"
        className={cn(
          "flex min-h-10 w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm leading-5 text-[color:var(--menu-item-text,var(--ldkj-color-foreground))] transition-colors hover:bg-[color:var(--menu-item-hover-bg,var(--ldkj-color-accent))] hover:text-[color:var(--menu-item-hover-text,var(--ldkj-color-accent-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)]",
          open && "bg-[color:var(--ldkj-color-muted)] text-[color:var(--ldkj-color-foreground)]",
          disabled &&
            "cursor-not-allowed text-[color:var(--menu-item-disabled-text,var(--ldkj-color-muted-foreground))] opacity-70 hover:bg-transparent",
        )}
        style={{
          paddingLeft: `calc(0.75rem + ${level} * ${toCssLength(context.indent)})`,
        }}
        aria-expanded={open}
        aria-disabled={disabled || undefined}
        data-menu-sub-key={itemKey}
        disabled={disabled}
        onClick={() => {
          if (!disabled) context.toggleOpenKey(itemKey);
        }}
        onKeyDown={(event) => {
          if (!disabled && isActivationKey(event)) {
            event.preventDefault();
            context.toggleOpenKey(itemKey);
          }
        }}
      >
        {icon ? (
          <Icon name={icon} size={18} className="shrink-0" {...iconProps} />
        ) : null}
        <span className="min-w-0 flex-1 truncate">{label}</span>
        <Icon
          name="unfold_more"
          size={18}
          className={cn(
            "shrink-0 transition-transform",
            open ? "rotate-180" : "rotate-90",
          )}
        />
      </button>

      {open ? (
        <MenuLevelContext.Provider value={level + 1}>
          <MenuParentKeyContext.Provider value={itemKey}>
            <MenuList
              role="menu"
              aria-label={typeof label === "string" ? label : undefined}
            >
              {children}
            </MenuList>
          </MenuParentKeyContext.Provider>
        </MenuLevelContext.Provider>
      ) : null}
    </li>
  );
}

MenuSub.displayName = "Menu.Sub";

export type MenuGroupProps = Omit<
  React.ComponentPropsWithoutRef<"li">,
  "className" | "style" | "children" | "title"
> &
  StyledProps & {
    label?: React.ReactNode;
    children?: React.ReactNode;
  };

function MenuGroup(props: MenuGroupProps) {
  const {
    label,
    className,
    class: legacyClass,
    sx,
    style,
    children,
    ...restProps
  } = props;
  const level = React.useContext(MenuLevelContext);
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <li
      className={cn("py-1", sxClassName, className, legacyClass)}
      style={mergeSxStyle(
        { listStyle: "none", margin: 0 },
        style,
        sxInlineStyle,
      )}
      {...restProps}
    >
      {label ? (
        <div
          className="px-3 py-2 text-xs font-medium uppercase text-[color:var(--ldkj-color-muted-foreground)]"
          style={{ paddingLeft: `calc(0.75rem + ${level} * 12px)` }}
        >
          {label}
        </div>
      ) : null}
      <MenuList role="group">{children}</MenuList>
    </li>
  );
}

MenuGroup.displayName = "Menu.Group";

export type MenuItemConfig = {
  key?: MenuKey;
  label: React.ReactNode;
  icon?: IconProps["name"];
  iconProps?: Omit<IconProps, "name">;
  href?: string;
  disabled?: boolean;
  children?: MenuItemConfig[];
  type?: "item" | "sub" | "group";
  unselectOnClick?: boolean;
  itemProps?: Omit<
    MenuItemProps,
    | "itemKey"
    | "label"
    | "icon"
    | "iconProps"
    | "href"
    | "disabled"
    | "children"
  >;
  subProps?: Omit<
    MenuSubProps,
    "itemKey" | "label" | "icon" | "iconProps" | "disabled" | "children"
  >;
  groupProps?: Omit<MenuGroupProps, "label" | "children">;
};

function renderMenuItems(
  items: MenuItemConfig[],
  indexPath: number[] = [],
): React.ReactNode {
  return items.map((item, index) => {
    const currentPath = [...indexPath, index];
    const key = getItemKey(item, currentPath);

    if (item.type === "group") {
      return (
        <MenuGroup key={key} label={item.label} {...item.groupProps}>
          {item.children ? renderMenuItems(item.children, currentPath) : null}
        </MenuGroup>
      );
    }

    if (item.children?.length || item.type === "sub") {
      return (
        <MenuSub
          key={key}
          itemKey={key}
          label={item.label}
          icon={item.icon}
          iconProps={item.iconProps}
          disabled={item.disabled}
          {...item.subProps}
        >
          {item.children ? renderMenuItems(item.children, currentPath) : null}
        </MenuSub>
      );
    }

    return (
      <MenuItem
        key={key}
        itemKey={key}
        label={item.label}
        icon={item.icon}
        iconProps={item.iconProps}
        href={item.href}
        disabled={item.disabled}
        unselectOnClick={item.unselectOnClick}
        {...item.itemProps}
      />
    );
  });
}

export type MenuProps<T extends ElementType = "nav"> = Omit<
  BoxProps<T>,
  "children"
> & {
  items?: MenuItemConfig[];
  selectedKeys?: MenuKey[];
  defaultSelectedKeys?: MenuKey[];
  onSelectedKeysChange?: (keys: MenuKey[], info: MenuChangeInfo) => void;
  openKeys?: MenuKey[];
  defaultOpenKeys?: MenuKey[];
  onOpenKeysChange?: (keys: MenuKey[], info: MenuChangeInfo) => void;
  multiple?: boolean;
  accordion?: boolean;
  indent?: number;
  itemGap?: number | string;
  itemColors?: MenuItemColors;
  menuRef?: React.Ref<MenuRef>;
  children?: React.ReactNode;
  listProps?: React.ComponentPropsWithoutRef<"ul"> & StyledProps;
};

type MenuCompound = {
  Item: typeof MenuItem;
  Sub: typeof MenuSub;
  Group: typeof MenuGroup;
  List: typeof MenuList;
};

type MenuComponent = (<T extends ElementType = "nav">(
  props: MenuProps<T>,
) => ReactElement | null) &
  MenuCompound;

function MenuRoot<T extends ElementType = "nav">(props: MenuProps<T>) {
  const {
    items,
    selectedKeys: selectedKeysProp,
    defaultSelectedKeys,
    onSelectedKeysChange,
    openKeys: openKeysProp,
    defaultOpenKeys,
    onOpenKeysChange,
    multiple = false,
    accordion = false,
    indent = 18,
    itemGap = 4,
    itemColors,
    menuRef,
    children,
    listProps,
    className,
    class: legacyClass,
    style,
    component,
    ...restProps
  } = props;
  const [selectedKeys, setSelectedKeys] = useControllableKeys({
    value: selectedKeysProp,
    defaultValue: defaultSelectedKeys,
    onChange: onSelectedKeysChange,
  });
  const [openKeys, setOpenKeys] = useControllableKeys({
    value: openKeysProp,
    defaultValue: defaultOpenKeys,
    onChange: onOpenKeysChange,
  });
  const subParentMapRef = React.useRef(new Map<MenuKey, MenuKey | null>());

  const registerSub = React.useCallback(
    (key: MenuKey, parentKey: MenuKey | null) => {
      subParentMapRef.current.set(key, parentKey);
      return () => {
        subParentMapRef.current.delete(key);
      };
    },
    [],
  );

  const selectKey = React.useCallback(
    (key: MenuKey, unselectOnClick?: boolean) => {
      const nextKeys = multiple
        ? selectedKeys.includes(key)
          ? selectedKeys.filter((item) => item !== key)
          : [...selectedKeys, key]
        : selectedKeys.includes(key) && unselectOnClick
          ? []
          : [key];

      setSelectedKeys(nextKeys, key);
    },
    [multiple, selectedKeys, setSelectedKeys],
  );

  const setOpen = React.useCallback(
    (key: MenuKey, open: boolean) => {
      const current = openKeys;
      let nextKeys = current;

      if (open) {
        if (current.includes(key)) return;
        if (accordion) {
          const parentKey = subParentMapRef.current.get(key) ?? null;
          nextKeys = current.filter(
            (item) => subParentMapRef.current.get(item) !== parentKey,
          );
        }
        nextKeys = [...nextKeys, key];
      } else {
        nextKeys = current.filter((item) => item !== key);
      }

      setOpenKeys(nextKeys, key);
    },
    [accordion, openKeys, setOpenKeys],
  );

  const toggleOpenKey = React.useCallback(
    (key: MenuKey) => {
      setOpen(key, !openKeys.includes(key));
    },
    [openKeys, setOpen],
  );

  React.useImperativeHandle(
    menuRef,
    () => ({
      select: (key) => selectKey(key),
      unselect: (key) =>
        setSelectedKeys(
          selectedKeys.filter((item) => item !== key),
          key,
        ),
      open: (key) => setOpen(key, true),
      close: (key) => setOpen(key, false),
      toggleOpen: toggleOpenKey,
      getSelectedKeys: () => selectedKeys,
      getOpenKeys: () => openKeys,
    }),
    [
      openKeys,
      selectKey,
      selectedKeys,
      setOpen,
      setSelectedKeys,
      toggleOpenKey,
    ],
  );

  const context = React.useMemo<MenuContextValue>(
    () => ({
      selectedKeys,
      openKeys,
      multiple,
      accordion,
      indent,
      itemGap,
      selectKey,
      toggleOpenKey,
      registerSub,
    }),
    [
      accordion,
      indent,
      itemGap,
      multiple,
      openKeys,
      registerSub,
      selectKey,
      selectedKeys,
      toggleOpenKey,
    ],
  );

  return (
    <MenuContext.Provider value={context}>
      <MenuLevelContext.Provider value={0}>
        <MenuParentKeyContext.Provider value={null}>
          <Box
            component={(component ?? "nav") as ElementType}
            className={cn(
              "w-64 rounded-lg border border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-card)] p-1 text-[color:var(--ldkj-color-card-foreground)]",
              className,
              legacyClass,
            )}
            style={mergeSxStyle(resolveMenuColorStyle(itemColors), style)}
            aria-label="Menu"
            {...restProps}
          >
            <MenuList role="menu" {...listProps}>
              {items ? renderMenuItems(items) : children}
            </MenuList>
          </Box>
        </MenuParentKeyContext.Provider>
      </MenuLevelContext.Provider>
    </MenuContext.Provider>
  );
}

MenuRoot.displayName = "Menu";

export const Menu = Object.assign(MenuRoot, {
  Item: MenuItem,
  Sub: MenuSub,
  Group: MenuGroup,
  List: MenuList,
}) as MenuComponent;
