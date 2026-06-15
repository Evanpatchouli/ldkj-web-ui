import CodeView from "../../CodeView";
import { Stepper } from "@ldkj/web-ui";

const items = [
  { label: "基础信息", description: "填写客户与合同资料" },
  { label: "方案配置", description: "确认服务、费用和生效规则" },
  { label: "提交审核", description: "推送给主管审批" },
];

const Example = () => (
  <Stepper
    items={items}
    defaultCurrent={1}
    progress={65}
    showContent
    contentProps={{
      children: (
        <div style={{ display: "grid", gap: 8 }}>
          <strong>方案配置</strong>
          <span>已选择基础服务包，正在补充费用和生效时间。</span>
        </div>
      ),
    }}
  />
);

const code = `import { Stepper } from "@ldkj/web-ui";

const items = [
  { label: "基础信息", description: "填写客户与合同资料" },
  { label: "方案配置", description: "确认服务、费用和生效规则" },
  { label: "提交审核", description: "推送给主管审批" },
];

export function Example() {
  return (
    <Stepper
      items={items}
      defaultCurrent={1}
      progress={65}
      showContent
      contentProps={{ children: "已选择基础服务包，正在补充费用和生效时间。" }}
    />
  );
}`;

export default function StepperBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

