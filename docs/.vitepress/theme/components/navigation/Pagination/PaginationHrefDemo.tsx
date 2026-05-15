import * as React from "react";
import { Box, Pagination } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Pagination } from "@ldkj/web-ui";

export function Example() {
  const [page, setPage] = React.useState(2);

  return (
    <Pagination
      count={6}
      page={page}
      getItemHref={(nextPage) => \`?page=\${nextPage}\`}
      onPageChange={(_, nextPage) => setPage(nextPage)}
    />
  );
}`;

export default function PaginationHrefDemo() {
  const [page, setPage] = React.useState(2);

  return (
    <CodeView code={code}>
      <Box className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <Pagination
          count={6}
          page={page}
          getItemHref={(nextPage) => `?page=${nextPage}`}
          onPageChange={(_, nextPage) => setPage(nextPage)}
        />
        <Box className="text-center text-sm text-slate-600">
          生成链接：?page={page}
        </Box>
      </Box>
    </CodeView>
  );
}

