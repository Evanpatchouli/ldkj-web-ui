import * as React from "react";
import { Box, Pagination } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Pagination } from "@ldkj/web-ui";

export function Example() {
  const [page, setPage] = React.useState(9);

  return (
    <Pagination
      count={24}
      page={page}
      onPageChange={(_, nextPage) => setPage(nextPage)}
    />
  );
}`;

export default function PaginationEllipsisDemo() {
  const [page, setPage] = React.useState(9);

  return (
    <CodeView code={code}>
      <Box className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-4">
        <Pagination
          count={24}
          page={page}
          onPageChange={(_, nextPage) => setPage(nextPage)}
        />
      </Box>
    </CodeView>
  );
}

