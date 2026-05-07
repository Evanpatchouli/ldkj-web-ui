import { Box, Menu } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Menu } from "@ldkj/web-ui";

export function Example() {
  return (
    <Menu
      defaultSelectedKeys={["alerts"]}
      itemColors={{
        itemText: "#365314",
        itemHoverBackground: "#ecfccb",
        itemSelectedText: "#1a2e05",
        itemSelectedBackground: "#bef264",
      }}
      sx={{
        width: 300,
        borderColor: "#a3e635",
        boxShadow: "0 12px 30px rgba(63, 98, 18, 0.12)",
      }}
      items={[
        { key: "quality", label: "质量看板", icon: "monitor" },
        { key: "alerts", label: "告警规则", icon: "notifications" },
        { key: "audit", label: "审计日志", icon: "check_circle" },
      ]}
    />
  );
}`;

export default function MenuSxDemo() {
  return (
    <CodeView code={code}>
      <Box className="flex justify-center rounded-xl border border-slate-200 bg-white p-4">
        <Menu
          defaultSelectedKeys={["alerts"]}
          itemColors={{
            itemText: "#365314",
            itemHoverBackground: "#ecfccb",
            itemSelectedText: "#1a2e05",
            itemSelectedBackground: "#bef264",
          }}
          sx={{
            width: 300,
            borderColor: "#a3e635",
            boxShadow: "0 12px 30px rgba(63, 98, 18, 0.12)",
          }}
          items={[
            { key: "quality", label: "质量看板", icon: "monitor" },
            { key: "alerts", label: "告警规则", icon: "notifications" },
            { key: "audit", label: "审计日志", icon: "check_circle" },
          ]}
        />
      </Box>
    </CodeView>
  );
}
