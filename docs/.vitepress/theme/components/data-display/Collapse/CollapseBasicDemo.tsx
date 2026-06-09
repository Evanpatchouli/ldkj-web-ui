import CodeView from "../../CodeView";
import { Collapse } from "@ldkj/web-ui";

const code = `import { Collapse } from "@ldkj/web-ui";

const items = [
  {
    key: "order",
    label: "订单信息",
    children: "展示订单编号、下单时间、渠道来源和当前履约状态。",
  },
  {
    key: "customer",
    label: "客户信息",
    children: "展示客户姓名、联系方式、会员等级和最近一次沟通记录。",
  },
  {
    key: "logistics",
    label: "物流信息",
    children: "展示发货仓、承运商、运单号和预计送达时间。",
  },
];

export function Example() {
  return <Collapse defaultActiveKey="order" items={items} />;
}`;

const items = [
  {
    key: "order",
    label: "订单信息",
    children: "展示订单编号、下单时间、渠道来源和当前履约状态。",
  },
  {
    key: "customer",
    label: "客户信息",
    children: "展示客户姓名、联系方式、会员等级和最近一次沟通记录。",
  },
  {
    key: "logistics",
    label: "物流信息",
    children: "展示发货仓、承运商、运单号和预计送达时间。",
  },
];

function Example() {
  return <Collapse defaultActiveKey="order" items={items} />;
}

export default function CollapseBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

