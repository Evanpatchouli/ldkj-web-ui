import { Box, Menu } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Menu } from "@ldkj/web-ui";

export function Example() {
  return (
    <Menu itemGap={10} defaultOpenKeys={["reports"]}>
      <Menu.Item itemKey="overview" icon="dashboard">
        总览
      </Menu.Item>
      <Menu.Sub itemKey="reports" label="报表" icon="article">
        <Menu.Item itemKey="daily">日报</Menu.Item>
        <Menu.Item itemKey="weekly">周报</Menu.Item>
      </Menu.Sub>
      <Menu.Item itemKey="settings" icon="settings">
        设置
      </Menu.Item>
    </Menu>
  );
}`;

export default function MenuItemGapDemo() {
  return (
    <CodeView code={code}>
      <Box className="flex justify-center rounded-xl border border-slate-200 bg-white p-4">
        <Menu itemGap={10} defaultOpenKeys={["reports"]}>
          <Menu.Item itemKey="overview" icon="dashboard">
            总览
          </Menu.Item>
          <Menu.Sub itemKey="reports" label="报表" icon="article">
            <Menu.Item itemKey="daily">日报</Menu.Item>
            <Menu.Item itemKey="weekly">周报</Menu.Item>
          </Menu.Sub>
          <Menu.Item itemKey="settings" icon="settings">
            设置
          </Menu.Item>
        </Menu>
      </Box>
    </CodeView>
  );
}
