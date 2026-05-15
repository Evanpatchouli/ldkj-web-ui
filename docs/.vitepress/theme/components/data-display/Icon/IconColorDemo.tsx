import { Icon } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Icon } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Icon name="favorite" size={24} color="#dc2626" />
      <Icon name="favorite" size={24} color="#f59e0b" />
      <Icon name="favorite" size={24} color="#16a34a" />
    </div>
  );
}`;

export default function IconColorDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-center gap-4">
        <Icon name="favorite" size={24} color="#dc2626" />
        <Icon name="favorite" size={24} color="#f59e0b" />
        <Icon name="favorite" size={24} color="#16a34a" />
      </div>
    </CodeView>
  );
}

