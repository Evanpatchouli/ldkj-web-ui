import { Navigator } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const items = [
  {
    key: "solution",
    label: "解决方案",
    children: [
      {
        key: "operation",
        label: "运营工作台",
        description: "面向日常运营的任务、告警和协同入口",
        href: "#operation",
        icon: "engineering",
      },
      {
        key: "data",
        label: "数据中台",
        description: "指标管理、数据服务和看板分析",
        href: "#data",
        icon: "data_usage",
      },
      {
        key: "security",
        label: "安全合规",
        description: "权限审计、访问控制和风险监测",
        href: "#security",
        icon: "admin_panel_settings",
      },
      {
        key: "open",
        label: "开放平台",
        description: "API、Webhook 和第三方集成能力",
        href: "#open",
        icon: "extension",
      },
    ],
  },
  {
    key: "resources",
    label: "资源",
    children: [
      {
        key: "guide",
        label: "落地指南",
        description: "从接入到上线的完整路径",
        href: "#guide",
        icon: "book",
      },
      {
        key: "release",
        label: "发布记录",
        description: "查看版本能力和升级建议",
        href: "#release",
        icon: "event_available",
      },
    ],
  },
];

const Example = () => <Navigator items={items} />;

const code = `import { Navigator } from "@ldkj/web-ui";

const items = [
  {
    key: "solution",
    label: "解决方案",
    children: [
      {
        key: "operation",
        label: "运营工作台",
        description: "面向日常运营的任务、告警和协同入口",
        href: "#operation",
        icon: "engineering",
      },
      {
        key: "data",
        label: "数据中台",
        description: "指标管理、数据服务和看板分析",
        href: "#data",
        icon: "data_usage",
      },
    ],
  },
];

const Example = () => <Navigator items={items} />;`;

export default function NavigatorMegaDemo() {
  return (
    <CodeView code={code} allowOverflow>
      <Example />
    </CodeView>
  );
}
