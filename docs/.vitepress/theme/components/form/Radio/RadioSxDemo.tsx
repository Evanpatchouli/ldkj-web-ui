import { RadioGroup } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { RadioGroup } from "@ldkj/web-ui";

export function Example() {
  return (
    <RadioGroup
      direction="horizontal"
      defaultValue="sms"
      sx={{
        padding: 12,
        border: "1px solid #dbeafe",
        borderRadius: 8,
        backgroundColor: "#eff6ff",
      }}
      options={[
        {
          label: "短信",
          value: "sms",
          radioProps: {
            sx: {
              color: "#2563eb",
              borderColor: "#2563eb",
            },
          },
        },
        { label: "邮件", value: "email" },
        { label: "站内信", value: "message" },
      ]}
    />
  );
}`;

function Example() {
  return (
    <RadioGroup
      direction="horizontal"
      defaultValue="sms"
      sx={{
        padding: 12,
        border: "1px solid #dbeafe",
        borderRadius: 8,
        backgroundColor: "#eff6ff",
      }}
      options={[
        {
          label: "短信",
          value: "sms",
          radioProps: {
            sx: {
              color: "#2563eb",
              borderColor: "#2563eb",
            },
          },
        },
        { label: "邮件", value: "email" },
        { label: "站内信", value: "message" },
      ]}
    />
  );
}

export default function RadioSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

