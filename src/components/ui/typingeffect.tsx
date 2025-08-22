"use client";

import React, { useEffect, useState } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number; // ms per character
  className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 100,
  className = "",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`whitespace-pre-wrap ${className}`}>
      {displayedText}
      {!typingDone && (
        <span className="animate-pulse inline-block w-[1ch]">|</span>
      )}
    </span>
  );
};

export default TypingEffect;
