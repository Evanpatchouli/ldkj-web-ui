import * as React from "react";
import { cn } from "@/lib/utils";

export type FormV2Props = React.FormHTMLAttributes<HTMLFormElement> & {
  class?: string;
};

export function FormV2(props: FormV2Props) {
  const { className, class: legacyClass, ...rest } = props;
  return <form className={cn("space-y-4", className, legacyClass)} {...rest} />;
}