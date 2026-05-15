import { GhostButton } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { GhostButton } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="relative h-56 rounded-xl border bg-slate-50">
      <GhostButton
        aria-label="Back"
        left={16}
        bottom={16}
        right="auto"
        position="absolute"
        variant="minor"
      >
        {"<"}
      </GhostButton>

      <GhostButton
        aria-label="Create"
        right={16}
        bottom={16}
        position="absolute"
        variant="primary"
        shadow="lg"
      >
        +
      </GhostButton>

      <GhostButton
        aria-label="To top"
        top={16}
        right={16}
        bottom="auto"
        size={44}
        position="absolute"
        variant="dark"
      >
        ^
      </GhostButton>
    </div>
  );
}`;

export default function GhostButtonPositionDemo() {
  return (
    <CodeView code={code}>
      <div className="relative h-56 overflow-hidden rounded-xl border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#e2e8f0_100%)]">
        <div className="flex h-full items-center justify-center text-sm text-slate-500">
          Position Preview
        </div>
        <GhostButton
          aria-label="Back"
          left={16}
          bottom={16}
          right="auto"
          position="absolute"
          variant="minor"
        >
          {"<"}
        </GhostButton>
        <GhostButton
          aria-label="Create"
          right={16}
          bottom={16}
          position="absolute"
          variant="primary"
          shadow="lg"
        >
          +
        </GhostButton>
        <GhostButton
          aria-label="To top"
          top={16}
          right={16}
          bottom="auto"
          size={44}
          position="absolute"
          variant="dark"
        >
          ^
        </GhostButton>
      </div>
    </CodeView>
  );
}

