import { useState } from "react";
import { Button } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    window.setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button loading={saving} loadingText="保存中..." onClick={handleSave}>
          保存
        </Button>
        <span className="text-sm text-slate-500">
          点击后自动恢复，避免重复提交
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          loading
          loadingText="正在生成任务包"
          data-button-loading-fixed="true"
        >
          生成任务包
        </Button>
        <Button
          loading
          loadingText="自定义指示器"
          loadingIcon={<span aria-hidden="true">◌</span>}
          variant="secondary"
        >
          导出
        </Button>
      </div>
    </div>
  );
};

const code = `import { useState } from "react";
import { Button } from "@ldkj/web-ui";

const Example = () => {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    window.setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button loading={saving} loadingText="保存中..." onClick={handleSave}>
          保存
        </Button>
        <span className="text-sm text-slate-500">
          点击后自动恢复，避免重复提交
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          loading
          loadingText="正在生成任务包"
          data-button-loading-fixed="true"
        >
          生成任务包
        </Button>
        <Button
          loading
          loadingText="自定义指示器"
          loadingIcon={<span aria-hidden="true">◌</span>}
          variant="secondary"
        >
          导出
        </Button>
      </div>
    </div>
  );
};`;

export default function ButtonLoadingDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
