import { Box, Menu } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Menu } from "@ldkj/web-ui";

export function Example() {
  return (
    <Menu indent={28} defaultOpenKeys={["system", "security"]}>
      <Menu.Sub itemKey="system" label="系统管理" icon="settings">
        <Menu.Item itemKey="profile">基础资料</Menu.Item>
        <Menu.Sub itemKey="security" label="安全设置">
          <Menu.Item itemKey="password">密码策略</Menu.Item>
          <Menu.Item itemKey="mfa">多因素认证</Menu.Item>
        </Menu.Sub>
      </Menu.Sub>
    </Menu>
  );
}`;

export default function MenuIndentDemo() {
  return (
    <CodeView code={code}>
      <Box className="flex justify-center rounded-xl border border-slate-200 bg-white p-4">
        <Menu indent={28} defaultOpenKeys={["system", "security"]}>
          <Menu.Sub itemKey="system" label="系统管理" icon="settings">
            <Menu.Item itemKey="profile">基础资料</Menu.Item>
            <Menu.Sub itemKey="security" label="安全设置">
              <Menu.Item itemKey="password">密码策略</Menu.Item>
              <Menu.Item itemKey="mfa">多因素认证</Menu.Item>
            </Menu.Sub>
          </Menu.Sub>
        </Menu>
      </Box>
    </CodeView>
  );
}

