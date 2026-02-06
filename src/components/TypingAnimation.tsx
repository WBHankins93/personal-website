'use client';

import React, { useState, useEffect } from "react";

interface TypingAnimationProps {
  words: string[];
  className?: string;
}

export default function TypingAnimation({ words, className = "" }: TypingAnimationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
      } else {
        setCurrentText(prev => currentWord.slice(0, prev.length + 1));
      }

      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex(prev => (prev + 1) % words.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={`${className} typing-cursor`}>
      {currentText}
    </span>
  );
}
