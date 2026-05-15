import { Avatar } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Avatar } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar rounded="sm"><Avatar.Fallback>SM</Avatar.Fallback></Avatar>
      <Avatar rounded="lg"><Avatar.Fallback>LG</Avatar.Fallback></Avatar>
      <Avatar rounded="full"><Avatar.Fallback>FL</Avatar.Fallback></Avatar>
      <Avatar rounded={12}><Avatar.Fallback>12</Avatar.Fallback></Avatar>
    </div>
  );
}`;

export default function AvatarRoundedDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-center gap-4">
        <Avatar rounded="sm"><Avatar.Fallback>SM</Avatar.Fallback></Avatar>
        <Avatar rounded="lg"><Avatar.Fallback>LG</Avatar.Fallback></Avatar>
        <Avatar rounded="full"><Avatar.Fallback>FL</Avatar.Fallback></Avatar>
        <Avatar rounded={12}><Avatar.Fallback>12</Avatar.Fallback></Avatar>
      </div>
    </CodeView>
  );
}

