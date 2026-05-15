import {
  Skeleton,
  SkeletonButton,
  SkeletonCard,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Skeleton, SkeletonButton, SkeletonCard } from "@ldkj/web-ui";

function Example() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <SkeletonCard
        rows={3}
        sx={{
          borderColor: "#bfdbfe",
          backgroundColor: "#eff6ff",
          "& .skeleton": {
            backgroundColor: "#bfdbfe",
          },
        }}
      />
      <div className="rounded-lg border border-gray-200 p-4">
        <Skeleton height={120} rounded="lg" />
        <div className="mt-4 flex justify-end">
          <SkeletonButton width={88} rounded="full" />
        </div>
      </div>
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <SkeletonCard
        rows={3}
        sx={{
          borderColor: "#bfdbfe",
          backgroundColor: "#eff6ff",
          "& .skeleton": {
            backgroundColor: "#bfdbfe",
          },
        }}
      />
      <div className="rounded-lg border border-gray-200 p-4">
        <Skeleton height={120} rounded="lg" />
        <div className="mt-4 flex justify-end">
          <SkeletonButton width={88} rounded="full" />
        </div>
      </div>
    </div>
  );
}

export default function SkeletonCardSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

