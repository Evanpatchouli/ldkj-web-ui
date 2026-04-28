import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Box,
  Icon,
} from "@/index";
import CodeView from "../../CodeView";

const code = `import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Icon,
} from "@ldkj/web-ui";

export function Example() {
  return (
    <Breadcrumb separator={<Icon name="chevron_right" className="h-3.5 w-3.5 text-slate-400" />}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">控制台</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/orders">订单中心</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>订单详情</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`;

export default function BreadcrumbSeparatorDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Breadcrumb
          separator={
            <Icon
              name="chevron_right"
              className="h-3.5 w-3.5 text-slate-400"
            />
          }
        >
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">控制台</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/orders">订单中心</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>订单详情</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Box>
    </CodeView>
  );
}
