import { Box, Tabs } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Tabs } from "@ldkj/web-ui";

export function Example() {
  return (
    <Tabs
      defaultValue="profile"
      items={[
        { value: "profile", label: "资料", content: "维护账号基本资料。" },
        { value: "security", label: "安全", content: "配置登录安全策略。" },
        { value: "billing", label: "账单", content: "查看订阅和账单记录。" },
      ]}
    />
  );
}`;

export default function TabsItemsDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Tabs
          defaultValue="profile"
          items={[
            {
              value: "profile",
              label: "资料",
              content: (
                <Box className="text-sm text-slate-700">
                  维护账号基本资料。
                </Box>
              ),
            },
            {
              value: "security",
              label: "安全",
              content: (
                <Box className="text-sm text-slate-700">
                  配置登录安全策略。
                </Box>
              ),
            },
            {
              value: "billing",
              label: "账单",
              content: (
                <Box className="text-sm text-slate-700">
                  查看订阅和账单记录。
                </Box>
              ),
            },
          ]}
        />
      </Box>
    </CodeView>
  );
}
