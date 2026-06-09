import * as React from "react";
import CodeView from "../CodeView";
import {
  Badge,
  Button,
  Card,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  ThemeProvider,
  createTheme,
} from "@ldkj/web-ui";

const brandTheme = createTheme({
  colors: {
    primary: "#7c3aed",
    primaryHover: "#6d28d9",
    primaryForeground: "#ffffff",
    ring: "#a78bfa",
    accent: "#f5f3ff",
    accentHover: "#ede9fe",
    success: "#059669",
    warning: "#d97706",
    danger: "#dc2626",
  },
  radii: {
    md: "10px",
    lg: "14px",
  },
});

function Example() {
  const [dark, setDark] = React.useState(false);

  return (
    <ThemeProvider theme={brandTheme} mode={dark ? "dark" : "light"}>
      <div style={{ display: "grid", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Switch checked={dark} label="深色主题" onCheckedChange={setDark} />
          <Badge variant="primary">ThemeProvider</Badge>
        </div>

        <Card
          padding="lg"
          header="主题预览"
          footer={
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Button variant="outline" size="sm">
                取消
              </Button>
              <Button size="sm">保存</Button>
            </div>
          }
        >
          <div style={{ display: "grid", gap: 12 }}>
            <Input placeholder="输入项目名称" />
            <Select defaultValue="pro">
              <SelectTrigger>
                <SelectValue placeholder="选择版本" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">标准版</SelectItem>
                <SelectItem value="pro">专业版</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}

const code = `import * as React from "react";
import {
  Badge,
  Button,
  Card,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  ThemeProvider,
  createTheme,
} from "@ldkj/web-ui";

const brandTheme = createTheme({
  colors: {
    primary: "#7c3aed",
    primaryHover: "#6d28d9",
    primaryForeground: "#ffffff",
    ring: "#a78bfa",
    accent: "#f5f3ff",
    accentHover: "#ede9fe",
    success: "#059669",
    warning: "#d97706",
    danger: "#dc2626",
  },
  radii: {
    md: "10px",
    lg: "14px",
  },
});

function Example() {
  const [dark, setDark] = React.useState(false);

  return (
    <ThemeProvider theme={brandTheme} mode={dark ? "dark" : "light"}>
      <div style={{ display: "grid", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Switch checked={dark} label="深色主题" onCheckedChange={setDark} />
          <Badge variant="primary">ThemeProvider</Badge>
        </div>

        <Card
          padding="lg"
          header="主题预览"
          footer={
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Button variant="outline" size="sm">
                取消
              </Button>
              <Button size="sm">保存</Button>
            </div>
          }
        >
          <div style={{ display: "grid", gap: 12 }}>
            <Input placeholder="输入项目名称" />
            <Select defaultValue="pro">
              <SelectTrigger>
                <SelectValue placeholder="选择版本" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">标准版</SelectItem>
                <SelectItem value="pro">专业版</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}`;

export default function ThemeBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
