import CodeView from "../../CodeView";
import { Stepper } from "@ldkj/web-ui";

const items = [
  { label: "资料校验", description: "已通过", status: "finish" as const },
  { label: "风险检查", description: "手机号格式异常", status: "error" as const },
  { label: "人工复核", description: "等待处理" },
  { label: "归档", description: "完成后自动归档", disabled: true },
];

const Example = () => (
  <Stepper
    items={items}
    current={1}
    clickable
    linear={false}
    labelPlacement="bottom"
  />
);

const code = `import { Stepper } from "@ldkj/web-ui";

const items = [
  { label: "资料校验", description: "已通过", status: "finish" },
  { label: "风险检查", description: "手机号格式异常", status: "error" },
  { label: "人工复核", description: "等待处理" },
  { label: "归档", description: "完成后自动归档", disabled: true },
];

export function Example() {
  return (
    <Stepper
      items={items}
      current={1}
      clickable
      linear={false}
      labelPlacement="bottom"
    />
  );
}`;

export default function StepperStatusDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

