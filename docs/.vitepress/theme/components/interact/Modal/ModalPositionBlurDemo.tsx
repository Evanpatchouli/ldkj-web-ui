import * as React from "react";
import { Modal } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Modal } from "@ldkj/web-ui";

export function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        定位与模糊
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        alpha={0.35}
        blur={8}
        x="calc(100% - 24px)"
        y="24px"
        translateX="-100%"
        translateY="0"
        contentSx={{ width: 320 }}
      >
        <div className="rounded-lg bg-white p-4 shadow-xl">
          右上角定位面板
        </div>
      </Modal>
    </>
  );
}`;

export default function ModalPositionBlurDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <CodeView code={code}>
      <button
        type="button"
        className="rounded-md border border-blue-200 px-4 py-2 text-sm text-blue-700 transition hover:bg-blue-50"
        onClick={() => setOpen(true)}
      >
        定位与模糊
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        alpha={0.35}
        blur={8}
        x="calc(100% - 24px)"
        y="24px"
        translateX="-100%"
        translateY="0"
        contentSx={{ width: 320 }}
      >
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xl">
          <div className="text-sm font-semibold text-slate-900">右上角面板</div>
          <div className="mt-1 text-xs text-slate-500">
            通过 x/y/translateX/translateY 控制定位，blur 控制遮罩模糊。
          </div>
          <div className="mt-3 text-right">
            <button
              type="button"
              className="rounded-md border border-slate-200 px-3 py-1.5 text-xs transition hover:bg-slate-50"
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

