import * as React from "react";
import { Modal } from "@/components/interact/modal";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Modal } from "@ldkj/web-ui";

export function Example() {
  const [open, setOpen] = React.useState(false);
  const [destroyOnClose, setDestroyOnClose] = React.useState(false);
  const [closeOnMaskClick, setCloseOnMaskClick] = React.useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>遮罩与销毁行为</button>
      <Modal
        open={open}
        destroyOnClose={destroyOnClose}
        closeOnMaskClick={closeOnMaskClick}
        onClose={() => setOpen(false)}
        scrollable
      >
        <div className="w-[420px] rounded-xl bg-white p-5">
          <label>
            <input
              type="checkbox"
              checked={destroyOnClose}
              onChange={(event) => setDestroyOnClose(event.target.checked)}
            />
            destroyOnClose
          </label>
          <label>
            <input
              type="checkbox"
              checked={closeOnMaskClick}
              onChange={(event) => setCloseOnMaskClick(event.target.checked)}
            />
            closeOnMaskClick
          </label>
        </div>
      </Modal>
    </>
  );
}`;

export default function ModalMaskDestroyDemo() {
  const [open, setOpen] = React.useState(false);
  const [destroyOnClose, setDestroyOnClose] = React.useState(false);
  const [closeOnMaskClick, setCloseOnMaskClick] = React.useState(false);

  return (
    <CodeView code={code}>
      <button
        type="button"
        className="rounded-md border border-emerald-200 px-4 py-2 text-sm text-emerald-700 transition hover:bg-emerald-50"
        onClick={() => setOpen(true)}
      >
        遮罩与销毁行为
      </button>
      <Modal
        open={open}
        destroyOnClose={destroyOnClose}
        closeOnMaskClick={closeOnMaskClick}
        onClose={() => setOpen(false)}
        scrollable
      >
        <div className="w-[420px] rounded-xl bg-white p-5 shadow-xl">
          <div className="text-sm font-semibold text-slate-900">行为开关</div>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={destroyOnClose}
                onChange={(event) => setDestroyOnClose(event.target.checked)}
              />
              <span>destroyOnClose（关闭时卸载 DOM）</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={closeOnMaskClick}
                onChange={(event) => setCloseOnMaskClick(event.target.checked)}
              />
              <span>closeOnMaskClick（点击遮罩触发关闭）</span>
            </label>
          </div>
          <div className="mt-4 flex justify-end">
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
