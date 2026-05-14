import { SkeletonText } from "@/components/data-display/skeleton";
import CodeView from "../../CodeView";

const code = `import { SkeletonText } from "@ldkj/web-ui";

function Example() {
  return (
    <div className="max-w-md space-y-4">
      <SkeletonText rows={4} widths={["36%", "100%", "92%", "64%"]} />
      <SkeletonText rows={2} rowHeight={18} gap={10} animated={false} />
    </div>
  );
}`;

function Example() {
  return (
    <div className="max-w-md space-y-4">
      <SkeletonText rows={4} widths={["36%", "100%", "92%", "64%"]} />
      <SkeletonText rows={2} rowHeight={18} gap={10} animated={false} />
    </div>
  );
}

export default function SkeletonTextRowsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
