import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Box,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ldkj/web-ui";

export function Example() {
  return (
    <Breadcrumb
      sx={{
        padding: "12px 16px",
        borderRadius: 16,
        backgroundColor: "#f8fafc",
      }}
    >
      <BreadcrumbList sx={{ color: "#64748b", fontSize: 14 }}>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/workspace"
            sx={{
              color: "#0f172a",
              fontWeight: 500,
              "&:hover": { color: "#2563eb" },
            }}
          >
            工作台
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator sx={{ color: "#94a3b8" }} />
        <BreadcrumbItem>
          <BreadcrumbLink href="/workspace/project-a">项目 A</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator sx={{ color: "#94a3b8" }} />
        <BreadcrumbItem>
          <BreadcrumbPage sx={{ color: "#2563eb", fontWeight: 600 }}>
            发布配置
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`;

export default function BreadcrumbSxDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Breadcrumb
          sx={{
            padding: "12px 16px",
            borderRadius: 16,
            backgroundColor: "#f8fafc",
          }}
        >
          <BreadcrumbList sx={{ color: "#64748b", fontSize: 14 }}>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/workspace"
                sx={{
                  color: "#0f172a",
                  fontWeight: 500,
                  "&:hover": { color: "#2563eb" },
                }}
              >
                工作台
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator sx={{ color: "#94a3b8" }} />
            <BreadcrumbItem>
              <BreadcrumbLink href="/workspace/project-a">
                项目 A
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator sx={{ color: "#94a3b8" }} />
            <BreadcrumbItem>
              <BreadcrumbPage sx={{ color: "#2563eb", fontWeight: 600 }}>
                发布配置
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Box>
    </CodeView>
  );
}

