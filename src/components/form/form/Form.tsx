import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

/**
 * Form 鏄竴涓爣鍑嗗寲鐨勫師鐢?form 瀹瑰櫒锛屽湪淇濈暀鍘熺敓琛ㄥ崟璇箟鐨勫悓鏃讹紝鍏佽浣跨敤鏈簱 `sx` 鏍峰紡绯荤粺杩涜缁熶竴瀹氬埗銆?
 */
export type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  class?: string;
  sx?: SxProps;
};

export function Form(props: FormProps) {
  const { className, class: legacyClass, style, sx, ...rest } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <form
      className={cn("space-y-4", sxClassName, className, legacyClass)}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...rest}
    />
  );
}

Form.displayName = "Form";
