import { Box, Tabs, TabsContent, TabsList, TabsTrigger } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ldkj/web-ui";

export function Example() {
  return (
    <Tabs
      defaultValue="east"
      sx={{ borderRadius: 16, backgroundColor: "#f8fafc", padding: 12 }}
    >
      <TabsList sx={{ backgroundColor: "#e0f2fe" }}>
        <TabsTrigger value="east" sx={{ "&[data-state=active]": { color: "#0369a1" } }}>
          华东
        </TabsTrigger>
        <TabsTrigger value="south">华南</TabsTrigger>
      </TabsList>
      <TabsContent value="east">华东区域在线率 99.9%。</TabsContent>
      <TabsContent value="south">华南区域在线率 99.7%。</TabsContent>
    </Tabs>
  );
}`;

export default function TabsSxDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Tabs
          defaultValue="east"
          sx={{ borderRadius: 16, backgroundColor: "#f8fafc", padding: 12 }}
        >
          <TabsList sx={{ backgroundColor: "#e0f2fe" }}>
            <TabsTrigger
              value="east"
              sx={{ "&[data-state=active]": { color: "#0369a1" } }}
            >
              华东
            </TabsTrigger>
            <TabsTrigger value="south">华南</TabsTrigger>
          </TabsList>
          <TabsContent value="east">
            <Box className="text-sm text-slate-700">
              华东区域在线率 99.9%。
            </Box>
          </TabsContent>
          <TabsContent value="south">
            <Box className="text-sm text-slate-700">
              华南区域在线率 99.7%。
            </Box>
          </TabsContent>
        </Tabs>
      </Box>
    </CodeView>
  );
}
