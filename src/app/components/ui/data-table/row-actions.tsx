"use client";

import { cn } from "@/lib/utils";
import {
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type RowAction = {
  label: string;
  icon?: LucideIcon;
  handler: (itemIds: number[]) => void;
  isDestructive?: boolean;
};

type RowActionsProps = {
  itemId: number;
  actions: RowAction[];
};

function RowActions({
  itemId,
  actions,
}: RowActionsProps) {
  const [open, setOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [position, setPosition] = useState({
    top: 0,
    right: 0,
  });

  function updatePosition() {
    if (!buttonRef.current) return;

    const rect =
      buttonRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + 4,
      right: window.innerWidth - rect.right,
    });
  }

  function toggleMenu() {
    if (!open) {
      updatePosition();
    }

    setOpen((current) => !current);
  }

  function handleAction(action: RowAction) {
    action.handler([itemId]);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function handlePositionChange() {
      updatePosition();
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener(
      "resize",
      handlePositionChange,
    );

    window.addEventListener(
      "scroll",
      handlePositionChange,
      true,
    );

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handlePositionChange,
      );

      window.removeEventListener(
        "scroll",
        handlePositionChange,
        true,
      );

      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={`Actions for item ${itemId}`}
        aria-expanded={open}
        onClick={toggleMenu}
        className={cn(
          "flex size-8 cursor-pointer items-center justify-center",
          "rounded-lg text-slate-500 transition",
          "hover:bg-slate-100 hover:text-slate-900",
        )}
      >
        <MoreHorizontal className="size-5" />
      </button>

      {open &&
        createPortal(
          <div
            style={{
              top: position.top,
              right: position.right,
            }}
            className={cn(
              "fixed z-[9999]",
              "min-w-40 rounded-lg",
              "border border-slate-200",
              "bg-white p-1 shadow-lg",
            )}
          >
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={() =>
                    handleAction(action)
                  }
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-2",
                    "rounded-md px-3 py-2",
                    "text-left text-sm transition",
                    action.isDestructive
                      ? "text-red-600 hover:bg-red-50"
                      : "text-slate-700 hover:bg-slate-100",
                  )}
                >
                  {Icon && (
                    <Icon className="size-4" />
                  )}

                  {action.label}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </>
  );
}

export default RowActions;
