import * as React from "react";
import { Modal } from "@/components/interact/modal";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Modal } from "@ldkj/web-ui";

export function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white"
        onClick={() => setOpen(true)}
      >
        打开 Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-[360px] rounded-xl bg-white p-5 shadow-xl">
          <div className="text-base font-semibold text-slate-900">确认操作</div>
          <div className="mt-2 text-sm text-slate-600">
            这是从 evp-modal 迁移并规范化后的 Modal 组件。
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-md border border-slate-200 px-3 py-1.5 text-sm"
              onClick={() => setOpen(false)}
            >
              关闭
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}`;

export default function ModalBasicDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <CodeView code={code}>
      <button
        type="button"
        className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-slate-700"
        onClick={() => setOpen(true)}
      >
        打开 Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-[360px] rounded-xl bg-white p-5 shadow-xl">
          <div className="text-base font-semibold text-slate-900">确认操作</div>
          <div className="mt-2 text-sm text-slate-600">
            这是从 evp-modal 迁移并规范化后的 Modal 组件。
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-md border border-slate-200 px-3 py-1.5 text-sm transition hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              关闭
            </button>
          </div>
        </div>
      </Modal>
    </CodeView>
  );
}
