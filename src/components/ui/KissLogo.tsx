import React from "react";

interface KissLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  showTagline?: boolean;
  taglineClassName?: string;
  inverted?: boolean;
  priority?: boolean;
}

export function KissLogo({
  className = "h-16 w-auto",
  size,
  showText = false,
  showTagline = false,
  taglineClassName = "text-[9.5px] sm:text-[10.5px] font-serif font-bold text-[#1b7340] leading-tight text-center mt-1",
  inverted = false,
  priority = false,
}: KissLogoProps) {
  const dimension = size || undefined;

  const imgNode = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/kiss-logo-official.png"
      alt="Kalinga Institute of Social Sciences - Established 1993"
      width={dimension}
      height={dimension}
      className={`object-contain inline-block select-none ${
        inverted ? "brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : ""
      } ${className}`}
      loading={priority ? "eager" : "lazy"}
      draggable={false}
    />
  );

  if (showTagline || showText) {
    return (
      <div className="flex flex-col items-center text-center max-w-[150px]">
        {imgNode}
        <span className={taglineClassName}>
          Eradicating hunger through Education.
        </span>
      </div>
    );
  }

  return imgNode;
}

