import { Avatar } from "@/components/data-display/avatar";
import CodeView from "../../CodeView";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const code = `import { Avatar } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex items-end gap-4">
      <Avatar size="xs"><Avatar.Fallback>XS</Avatar.Fallback></Avatar>
      <Avatar size="sm"><Avatar.Fallback>SM</Avatar.Fallback></Avatar>
      <Avatar size="md"><Avatar.Fallback>MD</Avatar.Fallback></Avatar>
      <Avatar size="lg"><Avatar.Fallback>LG</Avatar.Fallback></Avatar>
      <Avatar size="xl"><Avatar.Fallback>XL</Avatar.Fallback></Avatar>
    </div>
  );
}`;

export default function AvatarSizeDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-end gap-4">
        {sizes.map((size) => (
          <Avatar key={size} size={size}>
            <Avatar.Fallback>{size.toUpperCase()}</Avatar.Fallback>
          </Avatar>
        ))}
      </div>
    </CodeView>
  );
}
