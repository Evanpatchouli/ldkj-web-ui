import { Box } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Box } from "@ldkj/web-ui";

function Example() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Box rounded="md" shadow="sm" className="border border-gray-100 bg-white p-4 text-sm">
        sm
      </Box>
      <Box rounded="xl" shadow="lg" className="border border-gray-100 bg-white p-4 text-sm">
        lg
      </Box>
      <Box
        rounded={18}
        shadow="0 18px 45px rgba(15, 23, 42, 0.16)"
        className="border border-gray-100 bg-white p-4 text-sm"
      >
        custom
      </Box>
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Box
        rounded="md"
        shadow="sm"
        className="border border-gray-100 bg-white p-4 text-sm"
      >
        sm
      </Box>
      <Box
        rounded="xl"
        shadow="lg"
        className="border border-gray-100 bg-white p-4 text-sm"
      >
        lg
      </Box>
      <Box
        rounded={18}
        shadow="0 18px 45px rgba(15, 23, 42, 0.16)"
        className="border border-gray-100 bg-white p-4 text-sm"
      >
        custom
      </Box>
    </div>
  );
}

export default function BoxRoundedShadowDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

