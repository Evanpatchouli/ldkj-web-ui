import CodeView from "../../CodeView";
import { SafeArea, SafeAreaBottom, SafeAreaTop } from "@ldkj/web-ui";

const code = `import { SafeArea, SafeAreaBottom, SafeAreaTop } from "@ldkj/web-ui";

const Example = () => (
  <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-50 text-sm">
    <SafeAreaTop component="header" className="bg-slate-900 px-4 py-3 text-white">
      Header safe area
    </SafeAreaTop>
    <SafeArea component="main" position="both" horizontal className="px-4 py-6 text-slate-600">
      Content keeps padding for top, bottom, left and right safe-area insets.
    </SafeArea>
    <SafeAreaBottom component="footer" className="bg-white px-4 py-3 text-slate-500">
      Footer safe area
    </SafeAreaBottom>
  </div>
);`;

const Example = () => (
  <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-50 text-sm">
    <SafeAreaTop component="header" className="bg-slate-900 px-4 py-3 text-white">
      Header safe area
    </SafeAreaTop>
    <SafeArea component="main" position="both" horizontal className="px-4 py-6 text-slate-600">
      Content keeps padding for top, bottom, left and right safe-area insets.
    </SafeArea>
    <SafeAreaBottom component="footer" className="bg-white px-4 py-3 text-slate-500">
      Footer safe area
    </SafeAreaBottom>
  </div>
);

export default function SafeAreaBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
