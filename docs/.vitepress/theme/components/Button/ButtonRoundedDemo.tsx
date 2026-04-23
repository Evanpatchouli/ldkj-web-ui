import { Button } from "@/index";

const roundedPresets = ["xs", "sm", "md", "lg", "xl", "full"] as const;

export default function ButtonRoundedDemo() {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      {roundedPresets.map((rounded) => (
        <Button key={rounded} rounded={rounded}>
          {rounded}
        </Button>
      ))}
      <Button rounded={12}>12px</Button>
      <Button rounded="1.25rem">1.25rem</Button>
      <Button rounded="50%">50%</Button>
    </div>
  );
}
