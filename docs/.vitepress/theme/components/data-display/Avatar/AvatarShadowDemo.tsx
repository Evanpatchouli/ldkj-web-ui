import { Avatar } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Avatar } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar shadow="none"><Avatar.Fallback>N</Avatar.Fallback></Avatar>
      <Avatar shadow="sm"><Avatar.Fallback>S</Avatar.Fallback></Avatar>
      <Avatar shadow="lg"><Avatar.Fallback>L</Avatar.Fallback></Avatar>
      <Avatar shadow="0 0 0 3px rgba(14, 165, 233, 0.25)">
        <Avatar.Fallback>C</Avatar.Fallback>
      </Avatar>
    </div>
  );
}`;

export default function AvatarShadowDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-center gap-4">
        <Avatar shadow="none"><Avatar.Fallback>N</Avatar.Fallback></Avatar>
        <Avatar shadow="sm"><Avatar.Fallback>S</Avatar.Fallback></Avatar>
        <Avatar shadow="lg"><Avatar.Fallback>L</Avatar.Fallback></Avatar>
        <Avatar shadow="0 0 0 3px rgba(14, 165, 233, 0.25)">
          <Avatar.Fallback>C</Avatar.Fallback>
        </Avatar>
      </div>
    </CodeView>
  );
}

