import { Box, Menu } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Menu } from "@ldkj/web-ui";

export function Example() {
  return (
    <Menu
      defaultSelectedKeys={["release"]}
      defaultOpenKeys={["devops"]}
      items={[
        { key: "home", label: "首页", icon: "home", href: "/" },
        {
          key: "devops",
          label: "发布中心",
        icon: "publish",
        children: [
          { key: "pipeline", label: "流水线", icon: "dns" },
          { key: "release", label: "发布单", icon: "description" },
          ],
        },
        {
          key: "admin",
          label: "管理",
          type: "group",
          children: [
            { key: "roles", label: "角色权限", icon: "admin_panel_settings" },
            { key: "disabled", label: "停用入口", icon: "block", disabled: true },
          ],
        },
      ]}
    />
  );
}`;

export default function MenuItemsDemo() {
  return (
    <CodeView code={code}>
      <Box className="flex justify-center rounded-xl border border-slate-200 bg-white p-4">
        <Menu
          defaultSelectedKeys={["release"]}
          defaultOpenKeys={["devops"]}
          items={[
            { key: "home", label: "首页", icon: "home", href: "/" },
            {
              key: "devops",
              label: "发布中心",
              icon: "publish",
              children: [
                { key: "pipeline", label: "流水线", icon: "dns" },
                { key: "release", label: "发布单", icon: "description" },
              ],
            },
            {
              key: "admin",
              label: "管理",
              type: "group",
              children: [
                { key: "roles", label: "角色权限", icon: "admin_panel_settings" },
                { key: "disabled", label: "停用入口", icon: "block", disabled: true },
              ],
            },
          ]}
        />
      </Box>
    </CodeView>
  );
}
