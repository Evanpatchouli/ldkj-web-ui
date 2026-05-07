import { Box, Menu } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Menu } from "@ldkj/web-ui";

export function Example() {
  return (
    <Menu defaultSelectedKeys={["overview"]} defaultOpenKeys={["workspace"]}>
      <Menu.Item itemKey="overview" icon="dashboard" href="/overview">
        总览
      </Menu.Item>
      <Menu.Sub itemKey="workspace" label="工作台" icon="folder">
        <Menu.Item itemKey="projects" icon="view_list">
          项目列表
        </Menu.Item>
        <Menu.Item itemKey="members" icon="group">
          成员管理
        </Menu.Item>
      </Menu.Sub>
      <Menu.Item itemKey="settings" icon="settings">
        系统设置
      </Menu.Item>
    </Menu>
  );
}`;

export default function MenuBasicDemo() {
  return (
    <CodeView code={code}>
      <Box className="flex justify-center rounded-xl border border-slate-200 bg-slate-50 p-4">
        <Menu defaultSelectedKeys={["overview"]} defaultOpenKeys={["workspace"]}>
          <Menu.Item itemKey="overview" icon="dashboard" href="/overview">
            总览
          </Menu.Item>
          <Menu.Sub itemKey="workspace" label="工作台" icon="folder">
            <Menu.Item itemKey="projects" icon="view_list">
              项目列表
            </Menu.Item>
            <Menu.Item itemKey="members" icon="group">
              成员管理
            </Menu.Item>
          </Menu.Sub>
          <Menu.Item itemKey="settings" icon="settings">
            系统设置
          </Menu.Item>
        </Menu>
      </Box>
    </CodeView>
  );
}
