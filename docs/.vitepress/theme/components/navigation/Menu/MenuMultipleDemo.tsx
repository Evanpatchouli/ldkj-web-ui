import { Box, Menu } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Menu } from "@ldkj/web-ui";

export function Example() {
  return (
    <Menu
      multiple
      defaultSelectedKeys={["daily", "weekly"]}
      items={[
        { key: "daily", label: "日报订阅", icon: "article" },
        { key: "weekly", label: "周报订阅", icon: "calendar_month" },
        { key: "alerts", label: "告警通知", icon: "notifications" },
      ]}
    />
  );
}`;

export default function MenuMultipleDemo() {
  return (
    <CodeView code={code}>
      <Box className="flex justify-center rounded-xl border border-slate-200 bg-white p-4">
        <Menu
          multiple
          defaultSelectedKeys={["daily", "weekly"]}
          items={[
            { key: "daily", label: "日报订阅", icon: "article" },
            { key: "weekly", label: "周报订阅", icon: "calendar_month" },
            { key: "alerts", label: "告警通知", icon: "notifications" },
          ]}
        />
      </Box>
    </CodeView>
  );
}

