import { Icon } from "@/components/data-display/icon";
import CodeView from "../../CodeView";

const code = `import { Icon } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Icon name="info" size={24} />
      <Icon name="info" size={24} title="信息提示" />
    </div>
  );
}`;

export default function IconTitleDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-center gap-4">
        <Icon name="info" size={24} />
        <Icon name="info" size={24} title="信息提示" />
      </div>
    </CodeView>
  );
}
