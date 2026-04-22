import { Chip } from "@/components/ui/chip";

const variants = [
  "primary",
  "success",
  "warning",
  "danger",
  "minor",
  "dark",
  "light",
  "text",
] as const;

export default function ChipVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Chip key={variant} variant={variant}>
          {variant}
        </Chip>
      ))}
    </div>
  );
}

