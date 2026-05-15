import { GhostButton } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { GhostButton } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="relative h-48 overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50">
      <div className="flex h-full items-center justify-center text-sm text-slate-500">Preview Area</div>
      <GhostButton aria-label="Open help" variant="secondary" shadow="lg" position="absolute">
        ?
      </GhostButton>
    </div>
  );
}`;

export default function GhostButtonBasicDemo() {
  return (
    <CodeView code={code}>
      <div className="relative h-48 overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50">
        <div className="flex h-full items-center justify-center text-sm text-slate-500">Preview Area</div>
        <GhostButton aria-label="Open help" variant="secondary" shadow="lg" position="absolute">
          ?
        </GhostButton>
      </div>
    </CodeView>
  );
}

