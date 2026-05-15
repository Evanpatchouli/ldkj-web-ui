import { Box, Menu } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Menu } from "@ldkj/web-ui";

export function Example() {
  return (
    <Menu accordion defaultOpenKeys={["orders"]}>
      <Menu.Sub itemKey="orders" label="订单" icon="receipt">
        <Menu.Item itemKey="order-list">订单列表</Menu.Item>
        <Menu.Item itemKey="refund">退款处理</Menu.Item>
      </Menu.Sub>
      <Menu.Sub itemKey="inventory" label="库存" icon="inventory">
        <Menu.Item itemKey="stock">库存查询</Menu.Item>
        <Menu.Item itemKey="transfer">调拨记录</Menu.Item>
      </Menu.Sub>
      <Menu.Sub itemKey="finance" label="财务" icon="paid">
        <Menu.Item itemKey="settlement">结算单</Menu.Item>
        <Menu.Item itemKey="invoice">发票管理</Menu.Item>
      </Menu.Sub>
    </Menu>
  );
}`;

export default function MenuAccordionDemo() {
  return (
    <CodeView code={code}>
      <Box className="flex justify-center rounded-xl border border-slate-200 bg-slate-50 p-4">
        <Menu accordion defaultOpenKeys={["orders"]}>
          <Menu.Sub itemKey="orders" label="订单" icon="receipt">
            <Menu.Item itemKey="order-list">订单列表</Menu.Item>
            <Menu.Item itemKey="refund">退款处理</Menu.Item>
          </Menu.Sub>
          <Menu.Sub itemKey="inventory" label="库存" icon="inventory">
            <Menu.Item itemKey="stock">库存查询</Menu.Item>
            <Menu.Item itemKey="transfer">调拨记录</Menu.Item>
          </Menu.Sub>
          <Menu.Sub itemKey="finance" label="财务" icon="paid">
            <Menu.Item itemKey="settlement">结算单</Menu.Item>
            <Menu.Item itemKey="invoice">发票管理</Menu.Item>
          </Menu.Sub>
        </Menu>
      </Box>
    </CodeView>
  );
}

