"use client";

import { useEffect } from "react";

export default function CVModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-3xl text-slate-500 hover:text-slate-700"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-3 border-b text-center">
          <h2 className="text-xl font-semibold text-slate-800">My Resume</h2>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto px-4 pb-4">
          <embed
            src="/current-solutions-engineer-resume.pdf"
            className="w-full h-[75vh]"
            title="Ben Hankins Resume"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end bg-slate-50">
          <a
            href="/current-solutions-engineer-resume.pdf"
            download
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
