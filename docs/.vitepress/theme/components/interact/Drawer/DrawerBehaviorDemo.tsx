import * as React from "react";
import CodeView from "../../CodeView";
import { Button, Drawer } from "@ldkj/web-ui";

const code = `import * as React from "react";
import { Button, Drawer } from "@ldkj/web-ui";

const Example = () => {
  const [smoothOpen, setSmoothOpen] = React.useState(false);
  const [instantOpen, setInstantOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => setSmoothOpen(true)}>丝滑滑入</Button>
        <Button size="sm" onClick={() => setInstantOpen(true)}>关闭动画</Button>
      </div>
      <Drawer
        open={smoothOpen}
        onOpenChange={setSmoothOpen}
        title="默认动画"
        animated
        animationDuration={260}
        lockScroll
      >
        <p className="text-sm text-slate-600">默认保留关闭动画，并在打开期间锁定页面滚动。</p>
      </Drawer>
      <Drawer
        open={instantOpen}
        onOpenChange={setInstantOpen}
        title="无动画模式"
        animated={false}
        lockScroll={false}
      >
        <p className="text-sm text-slate-600">测试或特殊宿主环境可关闭动画和滚动锁。</p>
      </Drawer>
    </>
  );
};`;

const Example = () => {
  const [smoothOpen, setSmoothOpen] = React.useState(false);
  const [instantOpen, setInstantOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => setSmoothOpen(true)}>
          丝滑滑入
        </Button>
        <Button size="sm" onClick={() => setInstantOpen(true)}>
          关闭动画
        </Button>
      </div>
      <Drawer
        open={smoothOpen}
        onOpenChange={setSmoothOpen}
        title="默认动画"
        animated
        animationDuration={260}
        lockScroll
      >
        <p className="text-sm text-slate-600">默认保留关闭动画，并在打开期间锁定页面滚动。</p>
      </Drawer>
      <Drawer
        open={instantOpen}
        onOpenChange={setInstantOpen}
        title="无动画模式"
        animated={false}
        lockScroll={false}
      >
        <p className="text-sm text-slate-600">测试或特殊宿主环境可关闭动画和滚动锁。</p>
      </Drawer>
    </>
  );
};

export default function DrawerBehaviorDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
