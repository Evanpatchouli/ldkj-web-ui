import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/interact/dialog";
import CodeView from "../../CodeView";

const code = `import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ldkj/web-ui";

export function Example() {
  return (
    <Dialog>
      <DialogTrigger className="rounded-md border border-teal-200 px-4 py-2 text-sm text-teal-700">
        自定义布局
      </DialogTrigger>
      <DialogContent
        showClose={false}
        className="max-w-2xl gap-0 overflow-hidden p-0"
        sx={{ borderColor: "#99f6e4" }}
        overlaySx={{ backgroundColor: "rgba(15, 23, 42, 0.56)" }}
      >
        <div className="bg-teal-600 px-6 py-5 text-white">
          <DialogHeader className="text-left">
            <DialogTitle sx={{ color: "white" }}>交付看板</DialogTitle>
            <DialogDescription sx={{ color: "rgba(255, 255, 255, 0.82)" }}>
              使用 className 与 sx 调整内容、遮罩和标题区域。
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="grid gap-3 p-6 sm:grid-cols-3">
          {["需求确认", "开发联调", "验收发布"].map((item) => (
            <div key={item} className="rounded-md border border-slate-200 p-3">
              <div className="text-sm font-medium text-slate-900">{item}</div>
              <div className="mt-1 text-xs text-slate-500">本周持续推进</div>
            </div>
          ))}
        </div>
        <DialogFooter className="border-t border-slate-100 px-6 py-4">
          <DialogClose className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">
            知道了
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;

export default function DialogCustomLayoutDemo() {
  return (
    <CodeView code={code}>
      <Dialog>
        <DialogTrigger className="rounded-md border border-teal-200 px-4 py-2 text-sm text-teal-700 transition hover:bg-teal-50">
          自定义布局
        </DialogTrigger>
        <DialogContent
          showClose={false}
          className="max-w-2xl gap-0 overflow-hidden p-0"
          sx={{ borderColor: "#99f6e4" }}
          overlaySx={{ backgroundColor: "rgba(15, 23, 42, 0.56)" }}
        >
          <div className="bg-teal-600 px-6 py-5 text-white">
            <DialogHeader className="text-left">
              <DialogTitle sx={{ color: "white" }}>交付看板</DialogTitle>
              <DialogDescription
                sx={{ color: "rgba(255, 255, 255, 0.82)" }}
              >
                使用 className 与 sx 调整内容、遮罩和标题区域。
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="grid gap-3 p-6 sm:grid-cols-3">
            {["需求确认", "开发联调", "验收发布"].map((item) => (
              <div key={item} className="rounded-md border border-slate-200 p-3">
                <div className="text-sm font-medium text-slate-900">
                  {item}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  本周持续推进
                </div>
              </div>
            ))}
          </div>
          <DialogFooter className="border-t border-slate-100 px-6 py-4">
            <DialogClose className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-slate-700">
              知道了
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CodeView>
  );
}
