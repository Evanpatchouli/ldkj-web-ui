import React from "react";
import CodeView from "../../CodeView";
import { Drawer, Button } from "@ldkj/web-ui";

const code = `import * as React from "react";
import { Button, Drawer } from "@ldkj/web-ui";

const Example = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Drawer</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="筛选条件"
        footer={<Button size="sm" onClick={() => setOpen(false)}>应用筛选</Button>}
      >
        <div className="grid gap-3 text-sm text-slate-600">
          <div className="font-medium text-slate-900">订单筛选</div>
          <div className="rounded-md border border-slate-200 p-3">状态：待处理</div>
          <div className="rounded-md border border-slate-200 p-3">时间：最近 7 天</div>
        </div>
      </Drawer>
    </>
  );
};`;

const Example = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Drawer</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="筛选条件"
        footer={
          <Button size="sm" onClick={() => setOpen(false)}>
            应用筛选
          </Button>
        }
      >
        <div className="grid gap-3 text-sm text-slate-600">
          <div className="font-medium text-slate-900">订单筛选</div>
          <div className="rounded-md border border-slate-200 p-3">状态：待处理</div>
          <div className="rounded-md border border-slate-200 p-3">时间：最近 7 天</div>
        </div>
      </Drawer>
    </>
  );
};

export default function DrawerDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
