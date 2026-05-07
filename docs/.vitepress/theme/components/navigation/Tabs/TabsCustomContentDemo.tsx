import * as React from "react";
import { Box, Tabs, TabsList, TabsTrigger } from "@/index";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@ldkj/web-ui";

function CustomTabsContent(props: {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}) {
  if (props.value !== props.activeValue) return null;

  return (
    <section className="mt-3 rounded-lg border border-slate-200 bg-white p-4">
      {props.children}
    </section>
  );
}

export function Example() {
  const [value, setValue] = React.useState("metrics");

  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList>
        <TabsTrigger value="metrics">指标</TabsTrigger>
        <TabsTrigger value="events">事件</TabsTrigger>
      </TabsList>

      <CustomTabsContent value="metrics" activeValue={value}>
        这里是自定义指标面板。
      </CustomTabsContent>
      <CustomTabsContent value="events" activeValue={value}>
        这里是自定义事件面板。
      </CustomTabsContent>
    </Tabs>
  );
}`;

function CustomTabsContent(props: {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}) {
  if (props.value !== props.activeValue) return null;

  return (
    <section className="mt-3 rounded-lg border border-slate-200 bg-white text-slate-700 p-4 text-sm">
      {props.children}
    </section>
  );
}

export default function TabsCustomContentDemo() {
  const [value, setValue] = React.useState("metrics");

  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="metrics">指标</TabsTrigger>
            <TabsTrigger value="events">事件</TabsTrigger>
          </TabsList>

          <CustomTabsContent value="metrics" activeValue={value}>
            这里是自定义指标面板。
          </CustomTabsContent>
          <CustomTabsContent value="events" activeValue={value}>
            这里是自定义事件面板。
          </CustomTabsContent>
        </Tabs>
      </Box>
    </CodeView>
  );
}
