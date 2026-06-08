import * as React from "react";
import CodeView from "../../CodeView";
import { Alert, Button } from "@ldkj/web-ui";

const code = `import * as React from "react";
import { Alert, Button } from "@ldkj/web-ui";

const Example = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="grid gap-3">
      <Button size="sm" onClick={() => setOpen(true)}>重新显示</Button>
      <Alert
        open={open}
        onOpenChange={setOpen}
        closable
        showIcon
        variant="success"
        title="导出已开始"
        description="关闭提示不会中断后台任务。"
      />
    </div>
  );
};`;

const Example = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="grid gap-3">
      <Button size="sm" onClick={() => setOpen(true)}>
        重新显示
      </Button>
      <Alert
        open={open}
        onOpenChange={setOpen}
        closable
        showIcon
        variant="success"
        title="导出已开始"
        description="关闭提示不会中断后台任务。"
      />
    </div>
  );
};

export default function AlertClosableDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
