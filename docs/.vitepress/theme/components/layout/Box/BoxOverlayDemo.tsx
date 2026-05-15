import * as React from "react";
import { Box } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { useState } from "react";
import { Box } from "@ldkj/web-ui";

export function Example() {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setLoading(true)}>触发 loading</button>
        <button onClick={() => setModal(true)}>打开 modal</button>
      </div>

      <Box
        className="h-36 rounded-lg border p-4"
        loading={loading}
        modal={modal}
        onModalMaskClick={() => setModal(false)}
        modalContent={<div>这里是元素范围内的 modal 内容</div>}
      >
        这是 Box 内容区
      </Box>
    </div>
  );
}`;

export default function BoxOverlayDemo() {
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const triggerLoading = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  return (
    <CodeView code={code}>
      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-md border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50"
            onClick={triggerLoading}
          >
            触发 loading
          </button>
          <button
            type="button"
            className="rounded-md border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50"
            onClick={() => setModal(true)}
          >
            打开 modal
          </button>
        </div>

        <Box
          className="h-36 rounded-lg border border-gray-200 p-4 text-sm"
          loading={loading}
          modal={modal}
          onModalMaskClick={() => setModal(false)}
          modalContent={
            <div className="space-y-3 text-sm">
              <p>这是元素范围内的 modal，不会全屏覆盖。</p>
              <button
                type="button"
                className="rounded-md border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50"
                onClick={() => setModal(false)}
              >
                关闭
              </button>
            </div>
          }
        >
          这是 Box 内容区。
        </Box>
      </div>
    </CodeView>
  );
}

