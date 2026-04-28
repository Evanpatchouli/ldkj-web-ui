import { Icon } from "@/components/data-display/icon";
import CodeView from "../../CodeView";

const code = `import { Icon } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-gray-700">
      <Icon name="settings" variant="outlined" size={56} />
      <Icon name="settings" variant="rounded" size={56} />
      <Icon name="settings" variant="sharp" size={56} />
    </div>
  );
}`;

export default function IconVariantFillDemo() {
  return (
    <CodeView code={code}>
      <div className="flex flex-wrap items-center gap-4 text-gray-700">
        <Icon name="settings" variant="outlined" size={56} />
        <Icon name="settings" variant="rounded" size={56} />
        <Icon name="settings" variant="sharp" size={56} />
      </div>
    </CodeView>
  );
}
