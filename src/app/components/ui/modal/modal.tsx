"use client"

import { X } from "lucide-react"
import {
  ReactNode,
  useEffect,
  useState
} from "react"

import { createPortal } from "react-dom"

type ModalProps = {
  open: boolean
  title: string
  children: ReactNode
  footer?: ReactNode,
  onClose: () => void
}

export default function Modal({
  open,
  title,
  children,
  footer,
  onClose
}: ModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setModalRoot(document.getElementById("modal-root"))
  }, [])
  
  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onClose])

  if (!open || !modalRoot) return null

  return createPortal(
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/40
        px-4
      "
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="
          w-full max-w-lg
          overflow-hidden
          rounded-xl
          border border-slate-200
          bg-white
          shadow-xl
        "
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between
            border-b border-slate-200
            px-6 py-4
          "
        >
          <h2
            id="modal-title"
            className="text-lg font-semibold text-slate-950"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="
              flex size-8 cursor-pointer
              items-center justify-center
              rounded-md
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className="
              flex items-center justify-end gap-3
              border-t border-slate-200
              bg-slate-50
              px-6 py-4
            "
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    modalRoot
  )
}