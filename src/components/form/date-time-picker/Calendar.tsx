import { DayPicker } from "react-day-picker";
import { zhCN } from "react-day-picker/locale";
import { buttonVariants } from "@/components/interact/button";
import { cn } from "@/lib/utils";

/** 日期时间面板内部的单选日历，键盘导航和焦点管理由 DayPicker 负责。 */
export function Calendar(props: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      {...props}
      locale={zhCN}
      showOutsideDays
      className="ldkj-date-time-picker-calendar"
      classNames={{
        months: "relative",
        month_caption:
          "flex h-8 items-center justify-center text-sm font-medium",
        nav: "absolute inset-x-0 top-0 flex justify-between",
        button_previous: cn(buttonVariants({ variant: "ghost", size: "icon" })),
        button_next: cn(buttonVariants({ variant: "ghost", size: "icon" })),
        chevron: "h-4 w-4 fill-current",
        month_grid: "w-full border-collapse",
        weekday:
          "h-9 p-0 text-center text-xs font-normal text-[color:var(--ldkj-color-muted-foreground)]",
        day: "h-8 w-8 p-0 text-center text-sm",
        day_button: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "font-normal",
        ),
        selected: "ldkj-date-time-picker-day-selected",
        today: "ldkj-date-time-picker-today",
        outside: "text-[color:var(--ldkj-color-muted-foreground)] opacity-50",
        hidden: "invisible",
      }}
    />
  );
}
