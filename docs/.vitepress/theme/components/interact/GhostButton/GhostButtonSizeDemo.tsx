import { GhostButton } from "@/index";
import CodeView from "../../CodeView";

const code = `import { GhostButton } from "@ldkj/web-ui";

export function Example() {
  return (
    <>
      <GhostButton size="xs" aria-label="extra small" position="static" variant="outline">XS</GhostButton>
      <GhostButton size="sm" aria-label="small" position="static" variant="outline">SM</GhostButton>
      <GhostButton size="md" aria-label="medium" position="static" variant="outline">MD</GhostButton>
      <GhostButton size="lg" aria-label="large" position="static" variant="outline">LG</GhostButton>
      <GhostButton size="xl" aria-label="extra large" position="static" variant="outline">XL</GhostButton>
      <GhostButton size={56} aria-label="56px" position="static" variant="outline">56</GhostButton>
      <GhostButton size="4.5rem" aria-label="4.5rem" position="static">4.5</GhostButton>
    </>
  );
}`;

const items = [
  { size: "xs" as const, label: "XS" },
  { size: "sm" as const, label: "SM" },
  { size: "md" as const, label: "MD" },
  { size: "lg" as const, label: "LG" },
  { size: "xl" as const, label: "XL" },
  { size: 56, label: "56" },
  { size: "4.5rem", label: "4.5" },
];

export default function GhostButtonSizeDemo() {
  return (
    <CodeView code={code}>
      <div className="flex flex-wrap items-center gap-3">
        {items.map(({ size, label }) => (
          <GhostButton
            key={`${size}`}
            size={size}
            aria-label={`size ${label}`}
            variant="outline"
            position="static"
          >
            {label}
          </GhostButton>
        ))}
      </div>
    </CodeView>
  );
}
