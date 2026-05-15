import * as React from "react";
import { Box } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Box } from "@ldkj/web-ui";

export function Example() {
  const [count, setCount] = React.useState(0);

  return (
    <Box
      className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 select-none cursor-pointer"
      onLongPress={() => setCount((prev) => prev + 1)}
      longPressDelay={600}
    >
      按住我 600ms 触发 long press，当前次数：{count}
    </Box>
  );
}`;

export default function BoxLongPressDemo() {
  const [count, setCount] = React.useState(0);

  return (
    <CodeView code={code}>
      <Box
        className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 select-none cursor-pointer"
        onLongPress={() => setCount((prev) => prev + 1)}
        longPressDelay={600}
      >
        按住我 600ms 触发 long press，当前次数：{count}
      </Box>
    </CodeView>
  );
}

