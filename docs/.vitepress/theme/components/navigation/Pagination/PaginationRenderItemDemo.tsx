import * as React from "react";
import {
  Box,
  Pagination,
  PaginationEllipsis,
  PaginationLink,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Pagination, PaginationEllipsis, PaginationLink } from "@ldkj/web-ui";

export function Example() {
  const [page, setPage] = React.useState(4);

  return (
    <Pagination
      count={10}
      page={page}
      onPageChange={(_, nextPage) => setPage(nextPage)}
      renderItem={(item) => {
        if (item.type === "ellipsis") return <PaginationEllipsis />;
        if (item.type === "previous" || item.type === "next") {
          return (
            <PaginationLink
              href={item.href}
              disabled={item.disabled}
              onClick={item.onClick}
              sx={{ minWidth: 40 }}
            >
              {item.type === "previous" ? "Prev" : "Next"}
            </PaginationLink>
          );
        }
        return (
          <PaginationLink
            href={item.href}
            isActive={item.selected}
            disabled={item.disabled}
            onClick={item.onClick}
            sx={{ borderRadius: 8 }}
          >
            {item.page}
          </PaginationLink>
        );
      }}
    />
  );
}`;

export default function PaginationRenderItemDemo() {
  const [page, setPage] = React.useState(4);

  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Pagination
          count={10}
          page={page}
          onPageChange={(_, nextPage) => setPage(nextPage)}
          renderItem={(item) => {
            if (item.type === "ellipsis") return <PaginationEllipsis />;
            if (item.type === "previous" || item.type === "next") {
              return (
                <PaginationLink
                  href={item.href}
                  disabled={item.disabled}
                  onClick={item.onClick}
                  sx={{ minWidth: 40 }}
                >
                  {item.type === "previous" ? "Prev" : "Next"}
                </PaginationLink>
              );
            }
            return (
              <PaginationLink
                href={item.href}
                isActive={item.selected}
                disabled={item.disabled}
                onClick={item.onClick}
                sx={{ borderRadius: 8 }}
              >
                {item.page}
              </PaginationLink>
            );
          }}
        />
      </Box>
    </CodeView>
  );
}

