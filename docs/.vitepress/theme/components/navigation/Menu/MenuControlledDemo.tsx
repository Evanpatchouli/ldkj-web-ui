import * as React from "react";
import { Box, Button, Menu, useMenuRef } from "@/index";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Button, Menu, useMenuRef } from "@ldkj/web-ui";

export function Example() {
  const menuRef = useMenuRef();
  const [selectedKeys, setSelectedKeys] = React.useState(["ticket"]);
  const [openKeys, setOpenKeys] = React.useState(["support"]);

  return (
    <>
      <Button onClick={() => menuRef.current?.select("report")}>
        选中报表
      </Button>
      <Menu
        menuRef={menuRef}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onSelectedKeysChange={setSelectedKeys}
        onOpenKeysChange={setOpenKeys}
      >
        <Menu.Sub itemKey="support" label="服务台" icon="support">
          <Menu.Item itemKey="ticket">工单</Menu.Item>
          <Menu.Item itemKey="report">报表</Menu.Item>
        </Menu.Sub>
      </Menu>
    </>
  );
}`;

export default function MenuControlledDemo() {
  const menuRef = useMenuRef();
  const [selectedKeys, setSelectedKeys] = React.useState(["ticket"]);
  const [openKeys, setOpenKeys] = React.useState(["support"]);

  return (
    <CodeView code={code}>
      <Box className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row">
        <Box className="flex flex-row gap-2 sm:flex-col">
          <Button size="sm" onClick={() => menuRef.current?.select("report")}>
            选中报表
          </Button>
          <Button size="sm" variant="outline" onClick={() => menuRef.current?.toggleOpen("support")}>
            切换展开
          </Button>
        </Box>
        <Menu
          menuRef={menuRef}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onSelectedKeysChange={setSelectedKeys}
          onOpenKeysChange={setOpenKeys}
          className="shrink-0"
        >
          <Menu.Sub itemKey="support" label="服务台" icon="support">
            <Menu.Item itemKey="ticket">工单</Menu.Item>
            <Menu.Item itemKey="report">报表</Menu.Item>
          </Menu.Sub>
          <Menu.Sub itemKey="assets" label="资产" icon="inventory">
            <Menu.Item itemKey="device">设备台账</Menu.Item>
            <Menu.Item itemKey="license">许可证</Menu.Item>
          </Menu.Sub>
        </Menu>
      </Box>
    </CodeView>
  );
}
