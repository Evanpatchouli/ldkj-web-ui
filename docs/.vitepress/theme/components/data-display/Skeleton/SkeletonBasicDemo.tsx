import {
  Skeleton,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonText,
} from "@/components/data-display/skeleton";
import CodeView from "../../CodeView";

const code = `import { Skeleton, SkeletonAvatar, SkeletonButton, SkeletonText } from "@ldkj/web-ui";

function Example() {
  return (
    <div className="flex items-center gap-3">
      <SkeletonAvatar />
      <div className="min-w-0 flex-1">
        <SkeletonText rows={2} widths={["44%", "76%"]} />
      </div>
      <SkeletonButton width={72} />
    </div>
  );
}`;

function Example() {
  return (
    <div className="flex items-center gap-3">
      <SkeletonAvatar />
      <div className="min-w-0 flex-1">
        <SkeletonText rows={2} widths={["44%", "76%"]} />
      </div>
      <SkeletonButton width={72} />
    </div>
  );
}

export default function SkeletonBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
