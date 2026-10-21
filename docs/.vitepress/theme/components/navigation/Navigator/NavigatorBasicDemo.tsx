import { Navigator } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const items = [
  { key: "overview", label: "概览", href: "#overview", icon: "dashboard" },
  {
    key: "workspace",
    label: "工作台",
    icon: "apps",
    children: [
      {
        key: "tasks",
        label: "任务中心",
        description: "跟进待办、审批和执行进度",
        href: "#tasks",
        icon: "article",
      },
      {
        key: "members",
        label: "成员协作",
        description: "查看组织、角色和协作关系",
        href: "#members",
        icon: "contacts",
      },
    ],
  },
  { key: "settings", label: "设置", href: "#settings", icon: "settings" },
];

const Example = () => <Navigator defaultActiveKey="overview" items={items} />;

const code = `import { Navigator } from "@ldkj/web-ui";

const items = [
  { key: "overview", label: "概览", href: "#overview", icon: "dashboard" },
  {
    key: "workspace",
    label: "工作台",
    icon: "apps",
    children: [
      {
        key: "tasks",
        label: "任务中心",
        description: "跟进待办、审批和执行进度",
        href: "#tasks",
        icon: "article",
      },
      {
        key: "members",
        label: "成员协作",
        description: "查看组织、角色和协作关系",
        href: "#members",
        icon: "contacts",
      },
    ],
  },
  { key: "settings", label: "设置", href: "#settings", icon: "settings" },
];

const Example = () => <Navigator defaultActiveKey="overview" items={items} />;`;

export default function NavigatorBasicDemo() {
  return (
    <CodeView code={code} allowOverflow>
      <Example />
    </CodeView>
  );
}
