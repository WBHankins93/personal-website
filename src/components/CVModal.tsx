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
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] flex flex-col overflow-hidden ring-1 ring-slate-200/50">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-6 text-2xl md:text-3xl text-slate-500 hover:text-slate-700 z-10 bg-white/90 rounded-full w-8 h-8 md:w-10 md:h-10 md:bg-white/80 flex items-center justify-center shadow-sm ring-1 ring-slate-200/50 hover:ring-slate-300/50 transition-all"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Header */}
        <div className="px-4 md:px-6 pt-5 md:pt-6 pb-4 border-b border-slate-200/60 text-center">
          <h2 className="text-lg md:text-xl font-semibold text-slate-800">My Resume</h2>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-y-auto pb-2 md:pb-4 min-h-0">
          <iframe
            src={`/Ben_Hankins_Cloud_Resume_2026.pdf#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full border-0 h-[1400px] md:h-[calc(90vh-180px)]"
            title="Ben Hankins Resume"
            allow="fullscreen"
          />
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-slate-200/60 flex justify-center md:justify-end bg-gradient-to-br from-slate-50/50 to-white">
          <a
            href="/Ben_Hankins_Cloud_Resume_2026.pdf"
            download="Ben_Hankins_Cloud_Resume_2026.pdf"
            className="inline-block px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-sm md:text-base shadow-lg hover:shadow-xl ring-1 ring-blue-600/20"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
