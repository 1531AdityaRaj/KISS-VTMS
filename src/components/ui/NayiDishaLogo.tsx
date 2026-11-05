import React from "react";

interface NayiDishaLogoProps {
  className?: string;
  size?: number;
  showTagline?: boolean;
  inverted?: boolean;
  priority?: boolean;
}

export function NayiDishaLogo({
  className = "h-14 sm:h-16 w-auto",
  size,
  showTagline = true,
  inverted = false,
  priority = false,
}: NayiDishaLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/nayidisha-logo.png"
      alt="NayiDisha - Turning Skills into Opportunities"
      width={size || undefined}
      height={size || undefined}
      className={`object-contain inline-block select-none ${
        inverted ? "brightness-0 invert" : ""
      } ${className}`}
      loading={priority ? "eager" : "lazy"}
      draggable={false}
    />
  );
}
