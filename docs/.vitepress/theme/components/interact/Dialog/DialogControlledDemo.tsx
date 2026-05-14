import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/interact/dialog";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ldkj/web-ui";

export function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
        onClick={() => setOpen(true)}
      >
        打开受控弹窗
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>保存变更</DialogTitle>
            <DialogDescription>
              这个弹窗由外部状态控制，适合表单校验、异步提交等场景。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              type="button"
              className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-700"
              onClick={() => setOpen(false)}
            >
              稍后处理
            </button>
            <button
              type="button"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
              onClick={() => setOpen(false)}
            >
              保存
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}`;

export default function DialogControlledDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <CodeView code={code}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
          onClick={() => setOpen(true)}
        >
          打开受控弹窗
        </button>
        <span className="text-sm text-slate-500">
          当前状态：{open ? "open" : "closed"}
        </span>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>保存变更</DialogTitle>
            <DialogDescription>
              这个弹窗由外部状态控制，适合表单校验、异步提交等场景。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              type="button"
              className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              稍后处理
            </button>
            <button
              type="button"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
              onClick={() => setOpen(false)}
            >
              保存
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CodeView>
  );
}
