import { Avatar, AvatarImage, AvatarFallback } from "@/components/data-display/avatar";
import CodeView from "../../CodeView";

const src = "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=120&q=80";

const code = `import { Avatar, AvatarImage, AvatarFallback } from "@ldkj/web-ui";

export function Example() {
  return (
    <Avatar size="lg" aria-label="Alice" shadow="sm">
      <AvatarImage src={src} alt="Alice" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
  );
}`;

export default function AvatarExportDemo() {
  return (
    <CodeView code={code}>
      <Avatar size="lg" aria-label="Alice" shadow="sm">
        <AvatarImage src={src} alt="Alice" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
    </CodeView>
  );
}
