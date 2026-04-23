import { Divider } from "@/index";

export default function DividerVerticalDemo() {
  return (
    <div className="flex items-stretch gap-4 rounded border border-gray-100 p-4">
      <div className="text-sm self-center text-gray-500">A</div>
      <Divider vertical />
      <div className="text-sm self-center text-gray-500">B</div>
      <Divider vertical variant="middle" type="dashed" color="text-blue-300" />
      <div className="text-sm self-center text-gray-500">C</div>
    </div>
  );
}
