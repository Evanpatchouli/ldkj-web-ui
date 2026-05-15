import { Box, Pagination } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Pagination } from "@ldkj/web-ui";

export function Example() {
  return <Pagination count={7} defaultPage={4} showPreviousNext={false} />;
}`;

export default function PaginationPreviousNextDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Pagination count={7} defaultPage={4} showPreviousNext={false} />
      </Box>
    </CodeView>
  );
}

