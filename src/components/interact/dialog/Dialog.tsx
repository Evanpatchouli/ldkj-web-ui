import * as React from "react";
import * as ReactDOM from "react-dom";
import { Icon } from "@/components/data-display/icon";
import { Modal } from "@/components/interact/modal";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";
import { Booleanish } from "../../../../.references/evp-design-ui/dist/utils/index";

type StyledDomProps<T extends React.ElementType> = Omit<React.ComponentPropsWithoutRef<T>, "className" | "style"> & {
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

type AsChildProps = {
  asChild?: boolean;
  asChildWrapper?: React.ElementType;
};

export type DialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  lockScroll?: boolean;
  destroyOnClose?: boolean;
  closeOnMaskClick?: boolean;
  scrollable?: boolean;
  children?: React.ReactNode;
};

export type DialogTriggerProps = StyledDomProps<"button"> & AsChildProps;

export type DialogCloseProps = StyledDomProps<"button"> & AsChildProps;

export type DialogOverlayProps = StyledDomProps<"div"> & {
  blur?: boolean;
};

export type DialogContentProps = StyledDomProps<"div"> & {
  showClose?: boolean;
  overlayClassName?: string;
  overlaySx?: SxProps;
  overlayBlur?: boolean;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerEvent) => void;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
};

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  class?: string;
  sx?: SxProps;
};

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  class?: string;
  sx?: SxProps;
};

export type DialogTitleProps = StyledDomProps<"h2">;

export type DialogDescriptionProps = StyledDomProps<"p">;

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  modal: boolean;
  lockScroll: boolean;
  destroyOnClose: boolean;
  closeOnMaskClick: boolean;
  scrollable: boolean;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);
const DialogContentContext = React.createContext<{ showClose: boolean } | null>(null);

function useDialogContext(componentName: string) {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(`${componentName} 必须在 <Dialog> 内使用`);
  }
  return context;
}

function useResolvedSx(sx: SxProps | undefined) {
  const theme = useSxTheme();
  return resolveSx(sx, theme);
}

function useControllableOpenState(props: DialogProps) {
  const { open, defaultOpen = false, onOpenChange } = props;
  const isControlled = open !== undefined;
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const value = isControlled ? open : innerOpen;

  const setValue = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInnerOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  return [value, setValue] as const;
}

const DialogRoot = (props: DialogProps) => {
  const {
    open,
    defaultOpen,
    onOpenChange,
    modal = true,
    lockScroll = true,
    destroyOnClose = false,
    closeOnMaskClick = true,
    scrollable = false,
    children,
  } = props;
  const [resolvedOpen, setResolvedOpen] = useControllableOpenState({
    open,
    defaultOpen,
    onOpenChange,
  });

  const contextValue = React.useMemo<DialogContextValue>(
    () => ({
      open: resolvedOpen,
      setOpen: setResolvedOpen,
      modal,
      lockScroll,
      destroyOnClose,
      closeOnMaskClick,
      scrollable,
    }),
    [closeOnMaskClick, destroyOnClose, lockScroll, modal, resolvedOpen, scrollable, setResolvedOpen],
  );

  return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>;
};

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>((props, ref) => {
  const { setOpen } = useDialogContext("DialogTrigger");
  const {
    asChild,
    asChildWrapper: AsChildWrapper = "span",
    className,
    class: legacyClass,
    sx,
    style,
    children,
    onClick,
    ...restProps
  } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    onClick?.(event as React.MouseEvent<HTMLButtonElement>);
    if (event.defaultPrevented) return;
    setOpen(true);
  };

  if (asChild) {
    return (
      <AsChildWrapper
        ref={ref as React.Ref<HTMLElement>}
        className={cn("inline-flex w-fit", sxClassName, className, legacyClass)}
        style={mergeSxStyle(style, sxInlineStyle)}
        onClick={handleOpen}
        {...(restProps as Record<string, unknown>)}
      >
        {children}
      </AsChildWrapper>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn(sxClassName, className, legacyClass)}
      style={mergeSxStyle(style, sxInlineStyle)}
      onClick={handleOpen}
      {...restProps}
    >
      {children}
    </button>
  );
});

DialogTrigger.displayName = "DialogTrigger";

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>((props, ref) => {
  const { setOpen } = useDialogContext("DialogClose");
  const {
    asChild,
    asChildWrapper: AsChildWrapper = "span",
    className,
    class: legacyClass,
    sx,
    style,
    children,
    onClick,
    ...restProps
  } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    onClick?.(event as React.MouseEvent<HTMLButtonElement>);
    if (event.defaultPrevented) return;
    setOpen(false);
  };

  if (asChild) {
    return (
      <AsChildWrapper
        ref={ref as React.Ref<HTMLElement>}
        className={cn("inline-flex w-fit", sxClassName, className, legacyClass)}
        style={mergeSxStyle(style, sxInlineStyle)}
        onClick={handleClose}
        {...(restProps as Record<string, unknown>)}
      >
        {children}
      </AsChildWrapper>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn(sxClassName, className, legacyClass)}
      style={mergeSxStyle(style, sxInlineStyle)}
      onClick={handleClose}
      {...restProps}
    >
      {children}
    </button>
  );
});

DialogClose.displayName = "DialogClose";

type DialogPortalProps = {
  children?: React.ReactNode;
  container?: Element | DocumentFragment | null;
};

const DialogPortal = (props: DialogPortalProps) => {
  const { children, container } = props;
  if (typeof document === "undefined") return null;
  const mountNode = container ?? document.body;
  return mountNode ? ReactDOM.createPortal(children, mountNode) : null;
};

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>((props, ref) => {
  const { open, destroyOnClose, closeOnMaskClick, setOpen } = useDialogContext("DialogOverlay");
  const { className, class: legacyClass, sx, style, blur = true, onClick, ...restProps } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  if (!open && destroyOnClose) {
    return null;
  }

  return (
    <div
      ref={ref}
      hidden={!open}
      data-state={open ? "open" : "closed"}
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        blur ? "backdrop-blur-[1px]" : null,
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && closeOnMaskClick) {
          setOpen(false);
        }
      }}
      {...restProps}
    />
  );
});

DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => {
  const context = useDialogContext("DialogContent");
  const {
    children,
    className,
    class: legacyClass,
    sx,
    style,
    showClose = true,
    overlayClassName,
    overlaySx,
    overlayBlur = true,
    onEscapeKeyDown,
    onPointerDownOutside,
    onOpenAutoFocus,
    onCloseAutoFocus,
    ...contentProps
  } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const prevOpenRef = React.useRef(context.open);

  React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

  React.useEffect(() => {
    const previouslyOpen = prevOpenRef.current;
    if (!previouslyOpen && context.open) {
      const event = new Event("openAutoFocus", { cancelable: true });
      onOpenAutoFocus?.(event);
      if (!event.defaultPrevented) {
        contentRef.current?.focus();
      }
    }
    if (previouslyOpen && !context.open) {
      const event = new Event("closeAutoFocus", { cancelable: true });
      onCloseAutoFocus?.(event);
    }
    prevOpenRef.current = context.open;
  }, [context.open, onCloseAutoFocus, onOpenAutoFocus]);

  React.useEffect(() => {
    if (!context.open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onEscapeKeyDown?.(event);
      if (event.defaultPrevented) return;
      context.setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [context, onEscapeKeyDown]);

  const shouldLockScroll = context.lockScroll && context.modal;
  const shouldAllowBackgroundScroll = context.scrollable || !shouldLockScroll;
  const shouldCloseOnMaskClick = context.modal && context.closeOnMaskClick;

  return (
    <Modal
      open={context.open}
      destroyOnClose={context.destroyOnClose}
      closeOnMaskClick={shouldCloseOnMaskClick}
      scrollable={shouldAllowBackgroundScroll}
      blur={overlayBlur ? 1 : false}
      className={cn(
        "z-50",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        overlayClassName,
      )}
      sx={overlaySx}
      onClose={() => {
        const event = new PointerEvent("pointerdown", {
          bubbles: true,
          cancelable: true,
        });
        onPointerDownOutside?.(event);
        if (!event.defaultPrevented) {
          context.setOpen(false);
        }
      }}
      contentClassName="z-50 w-[calc(100%-2rem)] max-w-lg"
      contentSx={undefined}
      x="50%"
      y="50%"
      translateX="-50%"
      translateY="-50%"
    >
      <div
        ref={contentRef}
        role="dialog"
        aria-modal={Boolean(context.modal).toString() as Booleanish}
        tabIndex={-1}
        data-state={context.open ? "open" : "closed"}
        className={cn(
          "relative grid gap-4 rounded-lg border border-slate-200 bg-white p-6 text-slate-950 shadow-xl outline-none",
          "duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          sxClassName,
          className,
          legacyClass,
        )}
        style={mergeSxStyle(style, sxInlineStyle)}
        {...contentProps}
      >
        <DialogContentContext.Provider value={{ showClose }}>{children}</DialogContentContext.Provider>
      </div>
    </Modal>
  );
});

DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>((props, ref) => {
  const dialogContext = useDialogContext("DialogHeader");
  const contentContext = React.useContext(DialogContentContext);
  const showClose = contentContext?.showClose ?? false;
  const { className, class: legacyClass, sx, style, children, ...headerProps } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  return (
    <div
      ref={ref}
      className={cn("flex items-start justify-between gap-3", sxClassName, className, legacyClass)}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...headerProps}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 text-center sm:text-left">{children}</div>
      {showClose ? (
        <button
          type="button"
          className={cn(
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
            "text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            "disabled:pointer-events-none",
          )}
          aria-label="关闭弹窗"
          onClick={() => dialogContext.setOpen(false)}
        >
          <Icon name="close" size={16} />
        </button>
      ) : null}
    </div>
  );
});

DialogHeader.displayName = "DialogHeader";

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>((props, ref) => {
  const { className, class: legacyClass, sx, style, ...footerProps } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  return (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", sxClassName, className, legacyClass)}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...footerProps}
    />
  );
});

DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>((props, ref) => {
  const { className, class: legacyClass, sx, style, ...titleProps } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  return (
    <h2
      ref={ref}
      className={cn("m-0 text-lg font-semibold leading-6 text-slate-950", sxClassName, className, legacyClass)}
      style={mergeSxStyle(
        {
          margin: 0,
          borderTop: 0,
          paddingTop: 0,
          letterSpacing: 0,
          fontSize: "1.125rem",
          fontWeight: 600,
          lineHeight: "1.5rem",
        },
        style,
        sxInlineStyle,
      )}
      {...titleProps}
    />
  );
});

DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>((props, ref) => {
  const { className, class: legacyClass, sx, style, ...descriptionProps } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  return (
    <p
      ref={ref}
      className={cn("m-0 text-sm leading-5 text-slate-600", sxClassName, className, legacyClass)}
      style={mergeSxStyle(
        {
          margin: 0,
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
        },
        style,
        sxInlineStyle,
      )}
      {...descriptionProps}
    />
  );
});

DialogDescription.displayName = "DialogDescription";

type DialogCompound = ((props: DialogProps) => React.ReactElement) & {
  Trigger: typeof DialogTrigger;
  Portal: typeof DialogPortal;
  Close: typeof DialogClose;
  Overlay: typeof DialogOverlay;
  Content: typeof DialogContent;
  Header: typeof DialogHeader;
  Footer: typeof DialogFooter;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
};

const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Close: DialogClose,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
}) as DialogCompound;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
