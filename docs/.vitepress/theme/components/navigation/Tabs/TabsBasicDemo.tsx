import { Box, Tabs, TabsContent, TabsList, TabsTrigger } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ldkj/web-ui";

export function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">总览</TabsTrigger>
        <TabsTrigger value="logs">日志</TabsTrigger>
        <TabsTrigger value="settings">设置</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">当前服务运行稳定。</TabsContent>
      <TabsContent value="logs">最近 24 小时没有异常日志。</TabsContent>
      <TabsContent value="settings">这里可以放置配置表单。</TabsContent>
    </Tabs>
  );
}`;

export default function TabsBasicDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">总览</TabsTrigger>
            <TabsTrigger value="logs">日志</TabsTrigger>
            <TabsTrigger value="settings">设置</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Box className="text-sm text-slate-700">
              当前服务运行稳定。
            </Box>
          </TabsContent>
          <TabsContent value="logs">
            <Box className="text-sm text-slate-700">
              最近 24 小时没有异常日志。
            </Box>
          </TabsContent>
          <TabsContent value="settings">
            <Box className="text-sm text-slate-700">
              这里可以放置配置表单。
            </Box>
          </TabsContent>
        </Tabs>
      </Box>
    </CodeView>
  );
}

