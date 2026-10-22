import * as React from "react";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;
const timing: KeyframeAnimationOptions = {
  duration: 300,
  easing: "cubic-bezier(0.45, 0, 0.2, 1)",
};

function measurePill(pill: HTMLElement) {
  const style = getComputedStyle(pill);
  return {
    width: `${pill.getBoundingClientRect().width}px`,
    paddingLeft: style.paddingLeft,
    paddingRight: style.paddingRight,
    columnGap: style.columnGap,
  };
}

export function useTitleMotion() {
  const listRef = React.useRef<HTMLOListElement>(null);
  const previous = React.useRef(new Map<Element, ReturnType<typeof measurePill>>());
  const running = React.useRef(new Map<HTMLElement, Animation>());
  const markerAnimation = React.useRef<Animation | null>(null);

  useIsomorphicLayoutEffect(() => {
    const list = listRef.current;
    const marker = list?.querySelector<HTMLElement>(".mobile-stepper-active-indicator");
    if (!list || !marker) {
      for (const animation of running.current.values()) animation.cancel();
      running.current.clear();
      markerAnimation.current?.cancel();
      previous.current.clear();
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const initialized = list.hasAttribute("data-motion-ready");
    // 连续切换从当前画面接续，避免先跳到上一段动画的终点。
    const markerStyle = getComputedStyle(marker);
    const markerRect = marker.getBoundingClientRect();
    const markerFrom = {
      transform: markerStyle.transform,
      width: markerStyle.width,
      height: markerStyle.height,
    };
    for (const [item, animation] of running.current) {
      const pill = item.querySelector<HTMLElement>(".mobile-stepper-pill");
      if (pill && item.isConnected) {
        // 线性流程会在 button/span 之间切换；把进行中的动画接到新节点再取样。
        (animation.effect as KeyframeEffect).target = pill;
        previous.current.set(item, measurePill(pill));
      }
      animation.cancel();
    }
    running.current.clear();
    markerAnimation.current?.cancel();

    const pills = Array.from(list.querySelectorAll<HTMLElement>(".mobile-stepper-pill"));
    const active = pills.find((pill) => pill.getAttribute("aria-current") === "step");
    const syncMarker = () => {
      if (!active) {
        marker.style.visibility = "hidden";
        return null;
      }
      const rect = active.getBoundingClientRect();
      const parent = list.getBoundingClientRect();
      const target = {
        transform: `translate(${rect.x - parent.x}px, ${rect.y - parent.y}px)`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      };
      Object.assign(marker.style, target, {
        visibility: active.getAttribute("aria-disabled") === "true" ? "hidden" : "visible",
      });
      return target;
    };

    // 先读取终态几何，再开始宽度动画，让布局与共享高亮使用同一条曲线。
    const target = syncMarker();
    const activeRect = active?.getBoundingClientRect();
    const next = new Map<Element, ReturnType<typeof measurePill>>();
    const measurements = pills.map((pill) => ({ pill, to: measurePill(pill) }));
    const canAnimate = initialized && !media.matches;
    for (const { pill, to } of measurements) {
      const item = pill.parentElement!;
      const from = previous.current.get(item);
      next.set(item, to);
      const changed = from && (
        from.width !== to.width || from.paddingLeft !== to.paddingLeft ||
        from.paddingRight !== to.paddingRight || from.columnGap !== to.columnGap
      );
      if (canAnimate && from && changed) {
        const animation = pill.animate([from, to], timing);
        running.current.set(item, animation);
        animation.onfinish = () => {
          running.current.delete(item);
          if (!running.current.size) syncMarker();
        };
      }
    }
    previous.current = next;
    if (canAnimate && target && activeRect && (
      markerRect.x !== activeRect.x || markerRect.y !== activeRect.y ||
      markerFrom.width !== target.width || markerFrom.height !== target.height
    )) {
      markerAnimation.current = marker.animate([markerFrom, target], timing);
      markerAnimation.current.onfinish = syncMarker;
    }
    list.setAttribute("data-motion-ready", "");

    const syncAfterResize = () => {
      if (running.current.size) return;
      syncMarker();
      for (const pill of pills) previous.current.set(pill.parentElement!, measurePill(pill));
    };
    const observer = new ResizeObserver(syncAfterResize);
    observer.observe(list);
    for (const pill of pills) observer.observe(pill);
    const reduceMotion = () => {
      if (!media.matches) return;
      for (const animation of running.current.values()) animation.cancel();
      running.current.clear();
      markerAnimation.current?.cancel();
      syncMarker();
    };
    media.addEventListener("change", reduceMotion);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", reduceMotion);
    };
  });

  React.useEffect(() => () => {
    for (const animation of running.current.values()) animation.cancel();
    running.current.clear();
    markerAnimation.current?.cancel();
    previous.current.clear();
  }, []);

  return listRef;
}
