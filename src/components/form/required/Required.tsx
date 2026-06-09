import * as React from "react";

export function Required({ children }: { children?: React.ReactNode }) {
  return <span className="text-[color:var(--ldkj-color-danger)]">{children ?? "*"}</span>;
}
