"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

export default function DragScroll({
  className = "",
  children,
  autoScrollSpeed = 31.5,
}: {
  className?: string;
  children: ReactNode;
  autoScrollSpeed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });
  const auto = useRef({ paused: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: globalThis.MouseEvent) => {
      if (!drag.current.isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = x - drag.current.startX;
      if (Math.abs(walk) > 3) drag.current.moved = true;
      el.scrollLeft = drag.current.scrollLeft - walk;
    };

    const onMouseUp = () => {
      drag.current.isDown = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseDown = (e: globalThis.MouseEvent) => {
      drag.current.isDown = true;
      drag.current.moved = false;
      drag.current.startX = e.pageX - el.offsetLeft;
      drag.current.scrollLeft = el.scrollLeft;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };

    const onMouseEnter = () => {
      auto.current.paused = true;
    };
    const onMouseLeaveAuto = () => {
      auto.current.paused = false;
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeaveAuto);

    let rafId: number;
    let lastTime: number | null = null;

    const step = (time: number) => {
      if (lastTime === null) lastTime = time;
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (!auto.current.paused && !drag.current.isDown) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          let next = el.scrollLeft + autoScrollSpeed * dt;
          if (next >= maxScroll) {
            next = 0;
          }
          el.scrollLeft = next;
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeaveAuto);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [autoScrollSpeed]);

  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={ref}
      onClickCapture={onClickCapture}
      onDragStart={(e) => e.preventDefault()}
      className={`cursor-grab select-none active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {children}
    </div>
  );
}
