import { Button } from "../../../../src";

export default function ButtonSizesDemo() {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Button size="xs">X-Small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="md">Middle</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">X-Large</Button>
      <Button size="icon" aria-label="Add">
        +
      </Button>
    </div>
  );
}
