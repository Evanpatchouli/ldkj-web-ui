import { Avatar } from "@/components/data-display/avatar";
import CodeView from "../../CodeView";

const src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80";

const code = `import { Avatar } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <Avatar.Image src={src} alt="用户头像" />
        <Avatar.Fallback delayMs={500}>LH</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image src="/broken.png" alt="加载失败" />
        <Avatar.Fallback>ER</Avatar.Fallback>
      </Avatar>
    </div>
  );
}`;

export default function AvatarImageFallbackDemo() {
  return (
    <CodeView code={code}>
      <div className="flex items-center gap-4">
        <Avatar>
          <Avatar.Image src={src} alt="用户头像" />
          <Avatar.Fallback delayMs={500}>LH</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Image src="/broken.png" alt="加载失败" />
          <Avatar.Fallback>ER</Avatar.Fallback>
        </Avatar>
      </div>
    </CodeView>
  );
}
