import * as React from "react";
import CodeView from "../../CodeView";
import { Button, MobileStepper } from "@ldkj/web-ui";

const items = [
  { label: "账号", content: "账号信息已完成。" },
  { label: "门店", content: "门店资料正在填写。" },
  { label: "服务", content: "服务项目暂未配置。" },
  { label: "确认", content: "提交前检查所有信息。" },
];

const Example = () => {
  const [current, setCurrent] = React.useState(0);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 390 }}>
      <MobileStepper
        items={items}
        current={current}
        linear={false}
        onCurrentChange={setCurrent}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          type="button"
          variant="outline"
          disabled={current === 0}
          onClick={() => setCurrent((value) => Math.max(0, value - 1))}
        >
          上一步
        </Button>
        <Button
          type="button"
          disabled={current === items.length - 1}
          onClick={() => setCurrent((value) => Math.min(items.length - 1, value + 1))}
        >
          下一步
        </Button>
      </div>
    </div>
  );
};

const code = `import * as React from "react";
import { Button, MobileStepper } from "@ldkj/web-ui";

const items = [
  { label: "账号", content: "账号信息已完成。" },
  { label: "门店", content: "门店资料正在填写。" },
  { label: "服务", content: "服务项目暂未配置。" },
  { label: "确认", content: "提交前检查所有信息。" },
];

export function Example() {
  const [current, setCurrent] = React.useState(0);

  return (
    <>
      <MobileStepper
        items={items}
        current={current}
        linear={false}
        onCurrentChange={setCurrent}
      />
      <Button onClick={() => setCurrent((value) => Math.min(3, value + 1))}>
        下一步
      </Button>
    </>
  );
}`;

export default function MobileStepperControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
