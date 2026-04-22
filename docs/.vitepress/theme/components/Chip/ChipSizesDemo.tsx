import { Chip } from "@/components/ui/chip";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function ChipSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Chip key={size} size={size} variant="primary">
          {size}
        </Chip>
      ))}
    </div>
  );
}
