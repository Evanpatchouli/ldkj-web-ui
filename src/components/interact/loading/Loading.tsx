import * as React from "react";
import { Spin } from "@/components/interact/spin";

export function Loading({ text = "加载中..." }: { text?: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-slate-600">
      <Spin />
      <span>{text}</span>
    </div>
  );
}