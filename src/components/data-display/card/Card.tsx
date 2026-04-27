import * as React from "react";
import { Box, type BoxProps } from "@/components/layout/box";
import { cn } from "@/lib/utils";
import { mergeSxStyle } from "@/styling";

export type CardVariant = "outlined" | "elevated" | "filled" | "ghost";
export type CardPadding = "none" | "sm" | "md" | "lg";
export type CardDivided = boolean | "x" | "y";
export type CardSlotProps = BoxProps<React.ElementType>;
type CardSlotComponent = React.FC<CardSlotProps>;

export type CardProps = BoxProps<React.ElementType> & {
  variant?: CardVariant;
  padding?: CardPadding;
  divided?: CardDivided;
  hoverable?: boolean;
  selected?: boolean;
  disabled?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  start?: React.ReactNode;
  end?: React.ReactNode;
  contentLoading?: boolean;
  headerProps?: CardSlotProps;
  footerProps?: CardSlotProps;
  leftProps?: CardSlotProps;
  rightProps?: CardSlotProps;
  startProps?: CardSlotProps;
  endProps?: CardSlotProps;
  contentProps?: CardSlotProps;
};

type CardCompound = {
  Header: CardSlotComponent;
  Content: CardSlotComponent;
  Footer: CardSlotComponent;
  Left: CardSlotComponent;
  Right: CardSlotComponent;
  Start: CardSlotComponent;
  End: CardSlotComponent;
};

type CardComponent = React.FC<CardProps> & CardCompound;

const variantClass: Record<CardVariant, string> = {
  outlined: "border border-gray-200 bg-white",
  elevated: "border border-transparent bg-white",
  filled: "border border-gray-100 bg-gray-50",
  ghost: "border border-transparent bg-transparent shadow-none",
};

const variantShadow: Partial<Record<CardVariant, CardProps["shadow"]>> = {
  elevated: "md",
};

const paddingClass: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

function hasNode(value: React.ReactNode) {
  return value !== undefined && value !== null;
}

function hasCompoundChildren(children: React.ReactNode) {
  let found = false;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && isCardCompoundType(child.type)) {
      found = true;
    }
  });
  return found;
}

function isCardCompoundType(type: unknown) {
  return (
    type === CardHeader ||
    type === CardContent ||
    type === CardFooter ||
    type === CardLeft ||
    type === CardRight ||
    type === CardStart ||
    type === CardEnd
  );
}

function resolveDivided(divided: CardDivided | undefined, axis: "x" | "y") {
  return divided === true || divided === axis;
}

function resolveSlotPadding(padding: CardPadding) {
  return paddingClass[padding];
}

function resolveSideNode(primary: React.ReactNode, alias: React.ReactNode) {
  return hasNode(primary) ? primary : alias;
}

function resolveSideProps(primary?: CardSlotProps, alias?: CardSlotProps) {
  return primary ?? alias;
}

const CardHeader: CardSlotComponent = (props) => {
  return <Box {...props} data-card-slot="header" />;
};

const CardContent: CardSlotComponent = (props) => {
  return <Box {...props} data-card-slot="content" />;
};

const CardFooter: CardSlotComponent = (props) => {
  return <Box {...props} data-card-slot="footer" />;
};

const CardLeft: CardSlotComponent = (props) => {
  return <Box {...props} data-card-slot="left" />;
};

const CardRight: CardSlotComponent = (props) => {
  return <Box {...props} data-card-slot="right" />;
};

const CardStart: CardSlotComponent = (props) => {
  return <Box {...props} data-card-slot="start" />;
};

const CardEnd: CardSlotComponent = (props) => {
  return <Box {...props} data-card-slot="end" />;
};

function CardRoot(props: CardProps) {
  const {
    variant = "outlined",
    padding = "md",
    divided = true,
    hoverable = false,
    selected = false,
    disabled = false,
    header,
    footer,
    left,
    right,
    start,
    end,
    contentLoading = false,
    headerProps,
    footerProps,
    leftProps,
    rightProps,
    startProps,
    endProps,
    contentProps,
    children,
    className,
    style,
    rounded = "lg",
    shadow,
    onClick,
    ...restProps
  } = props;
  const leftNode = resolveSideNode(left, start);
  const rightNode = resolveSideNode(right, end);
  const resolvedLeftProps = resolveSideProps(leftProps, startProps);
  const resolvedRightProps = resolveSideProps(rightProps, endProps);
  const useCompoundChildren = hasCompoundChildren(children);

  const {
    className: contentClassName,
    style: contentStyle,
    loading: contentPropsLoading,
    ...restContentProps
  } = contentProps ?? {};

  if (useCompoundChildren) {
    return (
      <Box
        rounded={rounded}
        shadow={shadow ?? variantShadow[variant]}
        className={cn(
          "card flex overflow-hidden",
          variantClass[variant],
          hoverable && !disabled && "transition hover:-translate-y-0.5 hover:shadow-lg",
          selected && "border-blue-500 ring-2 ring-blue-100",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        style={mergeSxStyle(style, { flexDirection: "row" })}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
        {...restProps}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      rounded={rounded}
      shadow={shadow ?? variantShadow[variant]}
      className={cn(
        "card flex overflow-hidden",
        variantClass[variant],
        hoverable && !disabled && "transition hover:-translate-y-0.5 hover:shadow-lg",
        selected && "border-blue-500 ring-2 ring-blue-100",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      style={mergeSxStyle(style, { flexDirection: "row" })}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      {...restProps}
    >
      {hasNode(leftNode) ? (
        <Box
          {...resolvedLeftProps}
          className={cn(
            "card-left shrink-0",
            resolveDivided(divided, "x") && "border-r border-gray-100",
            resolvedLeftProps?.className,
          )}
        >
          {leftNode}
        </Box>
      ) : null}

      <Box className="card-main flex min-w-0 flex-1 flex-col">
        {hasNode(header) ? (
          <Box
            {...headerProps}
            className={cn(
              "card-header",
              resolveSlotPadding(padding),
              resolveDivided(divided, "y") && "border-b border-gray-100",
              headerProps?.className,
            )}
          >
            {header}
          </Box>
        ) : null}

        <Box
          {...restContentProps}
          className={cn(
            "card-content min-w-0 flex-1",
            resolveSlotPadding(padding),
            contentClassName,
          )}
          style={contentStyle}
          loading={contentLoading || contentPropsLoading}
        >
          {children}
        </Box>

        {hasNode(footer) ? (
          <Box
            {...footerProps}
            className={cn(
              "card-footer",
              resolveSlotPadding(padding),
              resolveDivided(divided, "y") && "border-t border-gray-100",
              footerProps?.className,
            )}
          >
            {footer}
          </Box>
        ) : null}
      </Box>

      {hasNode(rightNode) ? (
        <Box
          {...resolvedRightProps}
          className={cn(
            "card-right shrink-0",
            resolveDivided(divided, "x") && "border-l border-gray-100",
            resolvedRightProps?.className,
          )}
        >
          {rightNode}
        </Box>
      ) : null}
    </Box>
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Left: CardLeft,
  Right: CardRight,
  Start: CardStart,
  End: CardEnd,
}) as CardComponent;

Card.displayName = "Card";
Card.Header.displayName = "Card.Header";
Card.Content.displayName = "Card.Content";
Card.Footer.displayName = "Card.Footer";
Card.Left.displayName = "Card.Left";
Card.Right.displayName = "Card.Right";
Card.Start.displayName = "Card.Start";
Card.End.displayName = "Card.End";
