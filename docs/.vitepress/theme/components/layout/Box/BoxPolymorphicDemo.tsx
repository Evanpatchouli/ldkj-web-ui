import { Box } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Box } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="space-y-3">
      <Box component="section" className="rounded-md border p-3">
        section 语义容器
      </Box>
      <Box component="button" type="button" className="rounded-md border px-3 py-2">
        button 语义容器
      </Box>
    </div>
  );
}`;

export default function BoxPolymorphicDemo() {
  return (
    <CodeView code={code}>
      <div className="space-y-3">
        <Box component="section" className="rounded-md border border-gray-200 p-3 text-sm">
          section 语义容器
        </Box>
        <Box
          component="button"
          type="button"
          className="rounded-md border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
        >
          button 语义容器
        </Box>
      </div>
    </CodeView>
  );
}
