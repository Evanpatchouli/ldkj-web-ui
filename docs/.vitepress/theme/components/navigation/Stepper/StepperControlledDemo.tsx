import * as React from "react";
import CodeView from "../../CodeView";
import { Button, Stepper } from "@ldkj/web-ui";

const items = [
  { label: "选择门店", description: "绑定服务履约门店" },
  { label: "选择项目", description: "配置可售服务" },
  { label: "确认发布", description: "检查并上线" },
];

const Example = () => {
  const [current, setCurrent] = React.useState(0);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Stepper
        items={items}
        current={current}
        clickable
        linear={false}
        variant="navigation"
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
import { Button, Stepper } from "@ldkj/web-ui";

const items = [
  { label: "选择门店", description: "绑定服务履约门店" },
  { label: "选择项目", description: "配置可售服务" },
  { label: "确认发布", description: "检查并上线" },
];

export function Example() {
  const [current, setCurrent] = React.useState(0);

  return (
    <>
      <Stepper
        items={items}
        current={current}
        clickable
        linear={false}
        variant="navigation"
        onCurrentChange={setCurrent}
      />
      <Button onClick={() => setCurrent((value) => Math.min(2, value + 1))}>
        下一步
      </Button>
    </>
  );
}`;

export default function StepperControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

