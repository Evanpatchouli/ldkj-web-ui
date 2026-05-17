import CodeView from "../../CodeView";
import { List } from "@ldkj/web-ui";

const code = `import { List } from "@ldkj/web-ui";

export function Example() {
  return (
    <List
      sx={{
        maxWidth: 520,
        backgroundColor: "#f8fafc",
        borderRadius: 8,
        padding: 8,
        "& li": {
          padding: "10px 12px",
          borderRadius: 6,
          color: "#334155",
        },
        "& li:hover": {
          backgroundColor: "#e0f2fe",
        },
      }}
    >
      <li>销售日报</li>
      <li>库存预警</li>
      <li>回款提醒</li>
    </List>
  );
}`;

function Example() {
  return (
    <List
      sx={{
        maxWidth: 520,
        backgroundColor: "#f8fafc",
        borderRadius: 8,
        padding: 8,
        "& li": {
          padding: "10px 12px",
          borderRadius: 6,
          color: "#334155",
        },
        "& li:hover": {
          backgroundColor: "#e0f2fe",
        },
      }}
    >
      <li>销售日报</li>
      <li>库存预警</li>
      <li>回款提醒</li>
    </List>
  );
}

export default function ListSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
