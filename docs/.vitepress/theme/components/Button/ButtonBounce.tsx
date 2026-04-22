import { Button } from "@/index";

export default function ButtonBounceDemo() {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Button>Default</Button>
      <Button bounce>Bounce</Button>
    </div>
  );
}
