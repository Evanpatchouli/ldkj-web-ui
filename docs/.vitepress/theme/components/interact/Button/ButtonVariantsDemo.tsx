import { Button } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="minor">Minor</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="dark">Dark</Button>
      <Button variant="link">Link</Button>
      <Button variant="text">Text</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}`;

export default function ButtonVariantsDemo() {
  return (
    <CodeView code={code}>
      <div className="flex gap-2 items-center flex-wrap">
        <Button>Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="minor">Minor</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="dark">Dark</Button>
        <Button variant="link">Link</Button>
        <Button variant="text">Text</Button>
        <Button disabled>Disabled</Button>
      </div>
    </CodeView>
  );
}
