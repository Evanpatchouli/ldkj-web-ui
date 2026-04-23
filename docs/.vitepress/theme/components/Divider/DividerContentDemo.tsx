import { Divider } from "@/index";

export default function DividerContentDemo() {
  return (
    <div className="space-y-4">
      <Divider align="left">
        <span className="text-xs text-gray-500">Left</span>
      </Divider>
      <Divider align="center">
        <span className="text-xs text-gray-500">Center</span>
      </Divider>
      <Divider align="right">
        <span className="text-xs text-gray-500">Right</span>
      </Divider>
    </div>
  );
}
