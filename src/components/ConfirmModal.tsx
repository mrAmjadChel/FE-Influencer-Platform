"use client";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title = "ยืนยันการกระทำ",
  message = "คุณแน่ใจหรือไม่ว่าต้องการดำเนินการนี้?",
  confirmText = "ยืนยัน",
  cancelText = "ยกเลิก",
  onConfirm,
  onCancel
}: ConfirmModalProps) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-center">{title}</h2>
        <p className="mt-2 text-gray-700 text-center">{message}</p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
