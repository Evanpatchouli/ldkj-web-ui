import { Avatar } from "@/components/data-display/avatar";
import CodeView from "../../CodeView";

const code = `import { Avatar } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <Avatar.Fallback>LK</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>UI</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>86</Avatar.Fallback>
      </Avatar>
    </div>
  );
}`;

export default function AvatarBasicDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-center gap-4">
        <Avatar>
          <Avatar.Fallback>LK</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>UI</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>86</Avatar.Fallback>
        </Avatar>
      </div>
    </CodeView>
  );
}
