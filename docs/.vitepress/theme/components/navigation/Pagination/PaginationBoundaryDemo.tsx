import { Box, Pagination } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Pagination } from "@ldkj/web-ui";

export function Example() {
  return (
    <Pagination
      count={30}
      defaultPage={15}
      boundaryCount={2}
      siblingCount={2}
    />
  );
}`;

export default function PaginationBoundaryDemo() {
  return (
    <CodeView code={code}>
      <Box className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-4">
        <Pagination
          count={30}
          defaultPage={15}
          boundaryCount={2}
          siblingCount={2}
        />
      </Box>
    </CodeView>
  );
}

