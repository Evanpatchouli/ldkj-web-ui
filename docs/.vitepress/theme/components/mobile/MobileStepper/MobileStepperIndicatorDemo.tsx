import CodeView from "../../CodeView";
import { MobileStepper } from "@ldkj/web-ui";

const items = [
  { label: "预约", content: "选择服务时间。" },
  { label: "到店", content: "核销预约信息。" },
  { label: "施工", content: "技师执行服务。" },
  { label: "评价", content: "用户完成评价。" },
];

const Example = () => (
  <div style={{ display: "grid", gap: 20, maxWidth: 390 }}>
    <MobileStepper items={items} defaultCurrent={2} indicator="dots" />
    <MobileStepper
      items={items}
      defaultCurrent={2}
      indicator="progress"
      progress={72}
    />
    <MobileStepper items={items} defaultCurrent={2} indicator="text" />
  </div>
);

const code = `import { MobileStepper } from "@ldkj/web-ui";

const items = [
  { label: "预约", content: "选择服务时间。" },
  { label: "到店", content: "核销预约信息。" },
  { label: "施工", content: "技师执行服务。" },
  { label: "评价", content: "用户完成评价。" },
];

export function Example() {
  return (
    <>
      <MobileStepper items={items} defaultCurrent={2} indicator="dots" />
      <MobileStepper items={items} defaultCurrent={2} indicator="progress" progress={72} />
      <MobileStepper items={items} defaultCurrent={2} indicator="text" />
    </>
  );
}`;

export default function MobileStepperIndicatorDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

