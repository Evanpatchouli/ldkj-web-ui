import { Skeleton } from "@/components/data-display/skeleton";
import CodeView from "../../CodeView";

const code = `import { Skeleton } from "@ldkj/web-ui";

function Example() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="space-y-2">
        <div className="text-xs text-gray-500">text</div>
        <Skeleton variant="text" width="80%" />
      </div>
      <div className="space-y-2">
        <div className="text-xs text-gray-500">rect</div>
        <Skeleton variant="rect" width="100%" height={64} />
      </div>
      <div className="space-y-2">
        <div className="text-xs text-gray-500">circle</div>
        <Skeleton variant="circle" width={48} height={48} />
      </div>
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="space-y-2">
        <div className="text-xs text-gray-500">text</div>
        <Skeleton variant="text" width="80%" />
      </div>
      <div className="space-y-2">
        <div className="text-xs text-gray-500">rect</div>
        <Skeleton variant="rect" width="100%" height={64} />
      </div>
      <div className="space-y-2">
        <div className="text-xs text-gray-500">circle</div>
        <Skeleton variant="circle" width={48} height={48} />
      </div>
    </div>
  );
}

export default function SkeletonVariantsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
