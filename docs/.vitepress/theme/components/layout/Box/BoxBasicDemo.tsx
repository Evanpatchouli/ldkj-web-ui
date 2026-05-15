import { Box } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Box } from "@ldkj/web-ui";

export function Example() {
  return (
    <Box
      className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-blue-700"
      sx={{ "&:hover": { backgroundColor: "#dbeafe" } }}
    >
      我是一个基础 Box 容器
    </Box>
  );
}`;

export default function BoxBasicDemo() {
  return (
    <CodeView code={code}>
      <Box
        className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700 transition-colors"
        sx={{ "&:hover": { backgroundColor: "#dbeafe" } }}
      >
        我是一个基础 Box 容器（支持 className/style/sx）
      </Box>
    </CodeView>
  );
}

