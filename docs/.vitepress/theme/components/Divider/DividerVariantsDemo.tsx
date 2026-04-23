import { Divider } from "@/index";

const variants = ["full", "middle", "inset"] as const;

export default function DividerVariantsDemo() {
  return (
    <div className="space-y-4">
      {variants.map((variant) => (
        <div key={variant} className="space-y-2">
          <div className="text-xs text-gray-500">{variant}</div>
          <Divider variant={variant} />
        </div>
      ))}
    </div>
  );
}
