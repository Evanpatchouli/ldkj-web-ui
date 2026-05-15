import { Avatar } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Avatar } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex items-center">
      <Avatar className="ring-2 ring-white"><Avatar.Fallback>A</Avatar.Fallback></Avatar>
      <Avatar className="-ml-2 ring-2 ring-white"><Avatar.Fallback>B</Avatar.Fallback></Avatar>
      <Avatar className="-ml-2 ring-2 ring-white"><Avatar.Fallback>C</Avatar.Fallback></Avatar>
      <Avatar className="-ml-2 ring-2 ring-white"><Avatar.Fallback>D</Avatar.Fallback></Avatar>
    </div>
  );
}`;

export default function AvatarGroupDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-center">
        <Avatar className="ring-2 ring-white"><Avatar.Fallback>A</Avatar.Fallback></Avatar>
        <Avatar className="-ml-2 ring-2 ring-white"><Avatar.Fallback>B</Avatar.Fallback></Avatar>
        <Avatar className="-ml-2 ring-2 ring-white"><Avatar.Fallback>C</Avatar.Fallback></Avatar>
        <Avatar className="-ml-2 ring-2 ring-white"><Avatar.Fallback>D</Avatar.Fallback></Avatar>
      </div>
    </CodeView>
  );
}

