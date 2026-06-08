import * as React from "react";
import CodeView from "../../CodeView";
import { Button, Drawer, type DrawerPlacement } from "@ldkj/web-ui";

const placements: DrawerPlacement[] = ["left", "right", "top", "bottom"];

const code = `import * as React from "react";
import { Button, Drawer, type DrawerPlacement } from "@ldkj/web-ui";

const placements: DrawerPlacement[] = ["left", "right", "top", "bottom"];

const Example = () => {
  const [placement, setPlacement] = React.useState<DrawerPlacement>("right");
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {placements.map((item) => (
          <Button
            key={item}
            size="sm"
            onClick={() => {
              setPlacement(item);
              setOpen(true);
            }}
          >
            {item}
          </Button>
        ))}
      </div>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        placement={placement}
        width={360}
        height={260}
        title={\`从 \${placement} 打开\`}
      >
        <p className="text-sm text-slate-600">四个方向共用同一套滑入动画。</p>
      </Drawer>
    </>
  );
};`;

const Example = () => {
  const [placement, setPlacement] = React.useState<DrawerPlacement>("right");
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {placements.map((item) => (
          <Button
            key={item}
            size="sm"
            onClick={() => {
              setPlacement(item);
              setOpen(true);
            }}
          >
            {item}
          </Button>
        ))}
      </div>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        placement={placement}
        width={360}
        height={260}
        title={`从 ${placement} 打开`}
      >
        <p className="text-sm text-slate-600">四个方向共用同一套滑入动画。</p>
      </Drawer>
    </>
  );
};

export default function DrawerPlacementDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
