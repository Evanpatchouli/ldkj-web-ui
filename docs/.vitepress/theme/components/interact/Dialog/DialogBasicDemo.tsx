import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/interact/dialog";
import CodeView from "../../CodeView";

const code = `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@ldkj/web-ui";

export function Example() {
  return (
    <Dialog>
      <DialogTrigger className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">
        打开弹窗
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认发布</DialogTitle>
          <DialogDescription>
            发布后内容会同步到线上，团队成员可以立即查看。
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">
          请确认标题、封面和正文都已经完成校对。
        </div>
        <DialogFooter>
          <DialogClose className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            取消
          </DialogClose>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
            发布
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;

export default function DialogBasicDemo() {
  return (
    <CodeView code={code}>
      <Dialog>
        <DialogTrigger className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-slate-700">
          打开弹窗
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认发布</DialogTitle>
            <DialogDescription>
              发布后内容会同步到线上，团队成员可以立即查看。
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">
            请确认标题、封面和正文都已经完成校对。
          </div>
          <DialogFooter>
            <DialogClose className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">
              取消
            </DialogClose>
            <button
              type="button"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
            >
              发布
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CodeView>
  );
}
