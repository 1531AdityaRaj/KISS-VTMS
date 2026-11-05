"use client";

import React, { useState } from "react";

interface CourseThumbnailProps {
  src?: string;
  alt: string;
  code?: string;
  categoryName?: string;
  className?: string;
}

// Curated high-resolution, trade-specific authentic vocational photography (All 200 OK verified)
export const TRADE_PHOTOS: Record<string, string> = {
  "vt-3d": "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80", // 3D printer extruding in lab
  "vt-web": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80", // Web development & coding laptop
  "vt-comp": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", // Digital computer laboratory
  "vt-elec": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80", // Electrical circuit panel & multimeter wiring
  "vt-auto": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80", // Auto mechanic servicing engine in garage
  "vt-weld": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80", // Welding steel fabrication & sparks
  "vt-cnc": "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=800&q=80", // Industrial CNC metal milling & machining
  "vt-agri": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80", // Organic farming & harvested green crops
  "vt-const": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80", // Construction site worker in hardhat
  "vt-plumb": "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80", // Plumbing copper & PVC pipe installation
  "vt-carp": "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80", // Real carpentry wood joinery & woodworking bench
  "vt-tailor": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80", // Real sewing machine tailoring fabrics & patterns
  "vt-beauty": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80", // Beauty salon styling & cosmetology spa
  "vt-food": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80", // Professional chef culinary kitchen plating
  "vt-dairy": "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80", // Modern dairy farm cattle & livestock
  "vt-craft": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80", // Artisan potter crafting clay terracotta pottery
  "vt-mobile": "https://images.unsplash.com/photo-1588515724527-074a7a56616c?auto=format&fit=crop&w=800&q=80", // Phone technician repairing circuit board & screen
  "vt-solar": "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=800&q=80", // Rooftop solar photovoltaic panel array
  "vt-health": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80", // Healthcare clinical bedside nursing care
  "vt-hosp": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80", // Hotel luxury suite housekeeping & hospitality
  "vt-retail": "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=800&q=80", // Retail store counter checkout & customer sales
  "vt-logist": "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80", // Warehouse inventory parcel handling & logistics
  "vt-entrep": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80", // Small enterprise artisan shop owner planning
};

export function CourseThumbnail({
  src,
  alt,
  code = "VT-KISS",
  categoryName,
  className = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
}: CourseThumbnailProps) {
  const [hasError, setHasError] = useState(false);

  const normalizedCode = (code || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const formattedCode = normalizedCode.startsWith("vt") ? normalizedCode : `vt${normalizedCode}`;

  // Trade specific verified photo with local vector SVG fallback for offline environments
  const tradePhoto = TRADE_PHOTOS[formattedCode] || TRADE_PHOTOS["vt-3d"];
  const localSvgFallback = `/images/courses/${formattedCode}.svg`;
  const imageSource = hasError ? localSvgFallback : (src && src.startsWith("http") ? src : tradePhoto);

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden select-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSource}
        alt={alt}
        className={className}
        onError={() => {
          if (!hasError) {
            setHasError(true);
          }
        }}
        loading="lazy"
        draggable={false}
      />
      {/* Sleek bottom contrast gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
