import CodeView from "../../CodeView";
import { Collapse } from "@ldkj/web-ui";

const code = `import { Collapse } from "@ldkj/web-ui";

export function Example() {
  return (
    <Collapse
      accordion
      collapsible
      defaultActiveKey="billing"
      items={[
        {
          key: "billing",
          label: "费用与结算",
          children: (
            <Collapse
              variant="plain"
              bordered={false}
              size="sm"
              defaultActiveKey="invoice"
              items={[
                {
                  key: "invoice",
                  label: "什么时候开票？",
                  children: "账单确认后 1 个工作日内可申请开票。",
                },
                {
                  key: "refund",
                  label: "退款如何入账？",
                  children: "退款会原路退回，企业账户可在明细中查看。",
                },
              ]}
            />
          ),
        },
        {
          key: "security",
          label: "账号与安全",
          children: "管理员可在安全中心开启登录保护和操作二次确认。",
        },
      ]}
    />
  );
}`;

function Example() {
  return (
    <Collapse
      accordion
      collapsible
      defaultActiveKey="billing"
      items={[
        {
          key: "billing",
          label: "费用与结算",
          children: (
            <Collapse
              variant="plain"
              bordered={false}
              size="sm"
              defaultActiveKey="invoice"
              items={[
                {
                  key: "invoice",
                  label: "什么时候开票？",
                  children: "账单确认后 1 个工作日内可申请开票。",
                },
                {
                  key: "refund",
                  label: "退款如何入账？",
                  children: "退款会原路退回，企业账户可在明细中查看。",
                },
              ]}
            />
          ),
        },
        {
          key: "security",
          label: "账号与安全",
          children: "管理员可在安全中心开启登录保护和操作二次确认。",
        },
      ]}
    />
  );
}

export default function CollapseNestedDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

