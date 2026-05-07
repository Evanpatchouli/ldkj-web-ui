import { Box, Tabs, TabsContent, TabsList, TabsTrigger } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ldkj/web-ui";

export function Example() {
  return (
    <Tabs defaultValue="chart">
      <TabsList>
        <TabsTrigger value="chart">图表</TabsTrigger>
        <TabsTrigger value="table">表格</TabsTrigger>
      </TabsList>
      <TabsContent value="chart" borderless>
        自定义图表容器
      </TabsContent>
      <TabsContent value="table" borderless>
        自定义表格容器
      </TabsContent>
    </Tabs>
  );
}`;

export default function TabsBorderlessDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Tabs defaultValue="chart">
          <TabsList>
            <TabsTrigger value="chart">图表</TabsTrigger>
            <TabsTrigger value="table">表格</TabsTrigger>
          </TabsList>
          <TabsContent value="chart" borderless>
            自定义图表容器
          </TabsContent>
          <TabsContent value="table" borderless>
            自定义表格容器
          </TabsContent>
        </Tabs>
      </Box>
    </CodeView>
  );
}
