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
      onPageChange={(_, nextPage) => setPage(nextPage)}
      sx={{
        justifyContent: "flex-start",
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#f8fafc",
        "& a": {
          borderRadius: 999,
        },
        "& a[aria-current='page']": {
          borderColor: "#0284c7",
        },
      }}
      contentProps={{ sx: { gap: 8 } }}
    />
  );
}`;

export default function PaginationSxDemo() {
  const [page, setPage] = React.useState(2);

  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Pagination
          count={6}
          page={page}
          onPageChange={(_, nextPage) => setPage(nextPage)}
          sx={{
            justifyContent: "flex-start",
            padding: 12,
            borderRadius: 12,
            backgroundColor: "#f8fafc",
            "& a": {
              borderRadius: 999,
            },
            "& a[aria-current='page']": {
              borderColor: "#0284c7",
            },
          }}
          contentProps={{ sx: { gap: 8 } }}
        />
      </Box>
    </CodeView>
  );
}

