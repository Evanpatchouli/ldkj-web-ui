import * as React from "react";

export function Required({ children }: { children?: React.ReactNode }) {
  return <span className="text-rose-500">{children ?? "*"}</span>;
}