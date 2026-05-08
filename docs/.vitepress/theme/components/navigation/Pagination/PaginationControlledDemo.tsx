import * as React from "react";
import { Box, Pagination } from "@/index";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Pagination } from "@ldkj/web-ui";

export function Example() {
  const [page, setPage] = React.useState(3);

  return (
    <>
      <Pagination
        count={8}
        page={page}
        onPageChange={(_, nextPage) => setPage(nextPage)}
      />
      <div>当前页：{page}</div>
    </>
  );
}`;

export default function PaginationControlledDemo() {
  const [page, setPage] = React.useState(3);

  return (
    <CodeView code={code}>
      <Box className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <Pagination
          count={8}
          page={page}
          onPageChange={(_, nextPage) => setPage(nextPage)}
        />
        <Box className="text-center text-sm text-slate-600">当前页：{page}</Box>
      </Box>
    </CodeView>
  );
}
