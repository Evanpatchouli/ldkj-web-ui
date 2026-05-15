import { Avatar } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Avatar } from "@ldkj/web-ui";

export function Example() {
  return (
    <Avatar
      size={52}
      sx={{
        background: "linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)",
        color: "white",
        "& .avatar-fallback": { background: "transparent", color: "inherit" },
      }}
    >
      <Avatar.Fallback>SX</Avatar.Fallback>
    </Avatar>
  );
}`;

export default function AvatarSxDemo() {
  return (
    <CodeView code={code}>
      <Avatar
        size={52}
        sx={{
          background: "linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)",
          color: "white",
          "& .avatar-fallback": { background: "transparent", color: "inherit" },
        }}
      >
        <Avatar.Fallback>SX</Avatar.Fallback>
      </Avatar>
    </CodeView>
  );
}

