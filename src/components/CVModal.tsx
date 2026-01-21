"use client";

import { useEffect, useState } from "react";

export default function CVModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/Ben_Hankins_Technical_Resume.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Ben_Hankins_Technical_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      window.open("/Ben_Hankins_Technical_Resume.pdf", "_blank");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 md:p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[95vh] md:h-[90vh] flex flex-col overflow-hidden ring-1 ring-slate-200/50">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-6 text-2xl md:text-3xl text-slate-500 hover:text-slate-700 z-10 bg-white/90 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-sm ring-1 ring-slate-200/50 hover:ring-slate-300/50 transition-all"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Header */}
        <div className="px-4 md:px-6 pt-5 md:pt-6 pb-4 border-b border-slate-200/60 text-center flex-shrink-0">
          <h2 className="text-lg md:text-xl font-semibold text-slate-800">My Resume</h2>
        </div>

        {/* PDF Viewer - Different approach for mobile vs desktop */}
        <div className="flex-1 overflow-auto min-h-0">
          {isMobile ? (
            // Mobile: Use object tag with full height
            <object
              data="/Ben_Hankins_Technical_Resume.pdf"
              type="application/pdf"
              className="w-full h-full"
              style={{ minHeight: '100%' }}
            >
              <div className="p-4 text-center">
                <p className="text-slate-600 mb-4">PDF viewer not supported on this device.</p>
                <a
                  href="/Ben_Hankins_Technical_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                >
                  Open PDF in New Tab
                </a>
              </div>
            </object>
          ) : (
            // Desktop: Use iframe
            <iframe
              src="/Ben_Hankins_Technical_Resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
              className="w-full h-full border-0"
              title="Ben Hankins Resume"
              allow="fullscreen"
            />
          )}
        </div>

        {/* Footer - Only show download button on desktop */}
        {!isMobile && (
          <div className="p-4 md:p-6 border-t border-slate-200/60 flex justify-center md:justify-end bg-gradient-to-br from-slate-50/50 to-white flex-shrink-0">
            <a
              href="/Ben_Hankins_Technical_Resume.pdf"
              onClick={handleDownload}
              className="inline-block px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-sm md:text-base shadow-lg hover:shadow-xl ring-1 ring-blue-600/20 cursor-pointer"
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}