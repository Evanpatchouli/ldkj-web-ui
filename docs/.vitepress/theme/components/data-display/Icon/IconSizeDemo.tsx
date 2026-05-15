import { Icon } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Icon } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Icon name="search" size={16} />
      <Icon name="search" size={24} />
      <Icon name="search" size={32} />
    </div>
  );
}`;

export default function IconSizeDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-center gap-4">
        <Icon name="search" size={16} />
        <Icon name="search" size={24} />
        <Icon name="search" size={32} />
      </div>
    </CodeView>
  );
}

