import { Divider } from "@/index";

export default function DividerTypeColorDemo() {
  return (
    <div className="space-y-4">
      <Divider type="solid" color="text-gray-200" />
      <Divider type="dashed" color="text-amber-300" />
      <Divider type="dotted" color="text-green-300" />
    </div>
  );
}
