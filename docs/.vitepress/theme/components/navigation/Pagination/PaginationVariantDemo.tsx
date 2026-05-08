import { Box, Pagination } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Pagination } from "@ldkj/web-ui";

export function Example() {
  return (
    <>
      <Pagination count={5} defaultPage={2} variant="outline" />
      <Pagination count={5} defaultPage={2} variant="filled" />
    </>
  );
}`;

export default function PaginationVariantDemo() {
  return (
    <CodeView code={code}>
      <Box className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
        <Pagination count={5} defaultPage={2} variant="outline" />
        <Pagination count={5} defaultPage={2} variant="filled" />
      </Box>
    </CodeView>
  );
}
