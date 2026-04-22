import { Button } from "../../../../src";

export default function ButtonSplashDemo() {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Button>Default</Button>
      <Button splash>Splash</Button>
    </div>
  );
}
