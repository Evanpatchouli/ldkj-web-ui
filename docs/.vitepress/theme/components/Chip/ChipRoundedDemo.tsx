import { Chip } from "@/components/ui/chip";

const roundedPresets = ["xs", "sm", "md", "lg", "xl", "full"] as const;

export default function ChipRoundedDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {roundedPresets.map((rounded) => (
        <Chip key={rounded} rounded={rounded} variant="primary">
          {rounded}
        </Chip>
      ))}
      <Chip rounded={10} variant="success">
        10px
      </Chip>
      <Chip rounded="1rem" variant="warning">
        1rem
      </Chip>
      <Chip rounded="999px" variant="danger">
        999px
      </Chip>
    </div>
  );
}
