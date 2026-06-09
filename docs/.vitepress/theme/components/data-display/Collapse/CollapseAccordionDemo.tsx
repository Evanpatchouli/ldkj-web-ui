import CodeView from "../../CodeView";
import { Collapse } from "@ldkj/web-ui";

const code = `import { Collapse } from "@ldkj/web-ui";

export function Example() {
  return (
    <Collapse
      accordion
      defaultActiveKey="risk"
      items={[
        {
          key: "base",
          label: "基础资料校验",
          children: "校验企业名称、统一社会信用代码、联系人和开户主体。",
        },
        {
          key: "risk",
          label: "风控结果",
          children: "当前主体通过基础风控，需补充上传最近三个月流水。",
        },
        {
          key: "contract",
          label: "合同归档",
          children: "合同已生成，等待法务确认后进入归档流程。",
        },
      ]}
    />
  );
}`;

function Example() {
  return (
    <Collapse
      accordion
      defaultActiveKey="risk"
      items={[
        {
          key: "base",
          label: "基础资料校验",
          children: "校验企业名称、统一社会信用代码、联系人和开户主体。",
        },
        {
          key: "risk",
          label: "风控结果",
          children: "当前主体通过基础风控，需补充上传最近三个月流水。",
        },
        {
          key: "contract",
          label: "合同归档",
          children: "合同已生成，等待法务确认后进入归档流程。",
        },
      ]}
    />
  );
}

export default function CollapseAccordionDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

