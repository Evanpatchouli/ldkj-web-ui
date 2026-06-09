import CodeView from "../../CodeView";
import { Button, Collapse } from "@ldkj/web-ui";

const code = `import { Button, Collapse } from "@ldkj/web-ui";

export function Example() {
  return (
    <Collapse
      defaultActiveKey="invoice"
      expandIconPosition="start"
      items={[
        {
          key: "invoice",
          label: "开票信息",
          extra: <span className="text-xs text-blue-600">已认证</span>,
          children: "企业抬头、税号、开户地址和银行账号均已通过审核。",
        },
        {
          key: "record",
          label: "开票记录",
          extra: (
            <Button size="xs" variant="ghost">
              导出
            </Button>
          ),
          children: "最近 30 天共开票 24 张，累计金额 128,640.00 元。",
        },
        {
          key: "disabled",
          label: "历史迁移记录",
          disabled: true,
          children: "该项处于禁用状态，不参与键盘焦点和展开切换。",
        },
      ]}
    />
  );
}`;

function Example() {
  return (
    <Collapse
      defaultActiveKey="invoice"
      expandIconPosition="start"
      items={[
        {
          key: "invoice",
          label: "开票信息",
          extra: <span className="text-xs text-blue-600">已认证</span>,
          children: "企业抬头、税号、开户地址和银行账号均已通过审核。",
        },
        {
          key: "record",
          label: "开票记录",
          extra: (
            <Button size="xs" variant="ghost">
              导出
            </Button>
          ),
          children: "最近 30 天共开票 24 张，累计金额 128,640.00 元。",
        },
        {
          key: "disabled",
          label: "历史迁移记录",
          disabled: true,
          children: "该项处于禁用状态，不参与键盘焦点和展开切换。",
        },
      ]}
    />
  );
}

export default function CollapseItemsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

