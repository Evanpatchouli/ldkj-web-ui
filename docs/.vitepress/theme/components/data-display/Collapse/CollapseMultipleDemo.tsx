import CodeView from "../../CodeView";
import { Collapse } from "@ldkj/web-ui";

const code = `import { Collapse } from "@ldkj/web-ui";

export function Example() {
  return (
    <Collapse
      defaultActiveKey={["profile", "permission"]}
      items={[
        {
          key: "profile",
          label: "账号资料",
          children: "手机号、邮箱、企业身份和登录安全策略均已配置。",
        },
        {
          key: "permission",
          label: "权限范围",
          children: "当前账号拥有订单查看、售后处理和报表导出权限。",
        },
        {
          key: "notice",
          label: "通知偏好",
          children: "系统消息、审批消息和异常告警将通过站内信推送。",
        },
      ]}
    />
  );
}`;

function Example() {
  return (
    <Collapse
      defaultActiveKey={["profile", "permission"]}
      items={[
        {
          key: "profile",
          label: "账号资料",
          children: "手机号、邮箱、企业身份和登录安全策略均已配置。",
        },
        {
          key: "permission",
          label: "权限范围",
          children: "当前账号拥有订单查看、售后处理和报表导出权限。",
        },
        {
          key: "notice",
          label: "通知偏好",
          children: "系统消息、审批消息和异常告警将通过站内信推送。",
        },
      ]}
    />
  );
}

export default function CollapseMultipleDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

