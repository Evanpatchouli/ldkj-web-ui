import { Breadcrumb, Box } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Breadcrumb } from "@ldkj/web-ui";

export function Example() {
  return (
    <Breadcrumb
      items={[
        { label: "首页", href: "/" },
        { label: "组件", href: "/components" },
        { label: "Breadcrumb", current: true },
      ]}
    />
  );
}`;

export default function BreadcrumbItemsDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Breadcrumb
          items={[
            { label: "首页", href: "/" },
            { label: "组件", href: "/components" },
            { label: "Breadcrumb", current: true },
          ]}
        />
      </Box>
    </CodeView>
  );
}

