import { Chip } from "@/components/ui/chip";

const variants = ["primary", "success", "warning", "danger"] as const;

export default function ChipOutlineDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Chip key={variant} variant={variant} outline>
          {variant}
        </Chip>
      ))}
    </div>
  );
}

