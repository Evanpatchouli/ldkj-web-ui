import CodeView from "../../CodeView";
import { Collapse } from "@ldkj/web-ui";

const code = `import { Collapse } from "@ldkj/web-ui";

const items = [
  {
    key: "a",
    label: "服务配置",
    children: "配置服务名称、服务等级、计费方式和可用范围。",
  },
  {
    key: "b",
    label: "发布策略",
    children: "配置灰度比例、生效时间、回滚方式和通知对象。",
  },
];

export function Example() {
  return (
    <div className="grid gap-4">
      <Collapse size="sm" variant="outlined" defaultActiveKey="a" items={items} />
      <Collapse size="md" variant="filled" defaultActiveKey="a" items={items} />
      <Collapse size="lg" variant="ghost" defaultActiveKey="a" items={items} />
      <Collapse variant="plain" bordered={false} defaultActiveKey="a" items={items} />
    </div>
  );
}`;

const items = [
  {
    key: "a",
    label: "服务配置",
    children: "配置服务名称、服务等级、计费方式和可用范围。",
  },
  {
    key: "b",
    label: "发布策略",
    children: "配置灰度比例、生效时间、回滚方式和通知对象。",
  },
];

function Example() {
  return (
    <div className="grid gap-4">
      <Collapse size="sm" variant="outlined" defaultActiveKey="a" items={items} />
      <Collapse size="md" variant="filled" defaultActiveKey="a" items={items} />
      <Collapse size="lg" variant="ghost" defaultActiveKey="a" items={items} />
      <Collapse variant="plain" bordered={false} defaultActiveKey="a" items={items} />
    </div>
  );
}

export default function CollapseVariantsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

