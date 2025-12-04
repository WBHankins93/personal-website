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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 md:p-4">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] flex flex-col overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-3 md:right-4 text-2xl md:text-3xl text-slate-500 hover:text-slate-700 z-10 bg-white/80 rounded-full w-8 h-8 md:w-auto md:h-auto md:bg-transparent flex items-center justify-center"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Header */}
        <div className="px-4 md:px-6 pt-4 md:pt-6 pb-3 border-b text-center">
          <h2 className="text-lg md:text-xl font-semibold text-slate-800">My Resume</h2>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto pb-2 md:pb-4">
          <iframe
            src={`/Ben_Hankins_Master_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            className="w-full h-[70vh] md:h-[75vh] border-0"
            title="Ben Hankins Resume"
          />
        </div>

        {/* Footer */}
        <div className="p-3 md:p-4 border-t flex justify-center md:justify-end bg-slate-50">
          <a
            href="/Ben_Hankins_Master_Resume.pdf"
            download
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm md:text-base"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
