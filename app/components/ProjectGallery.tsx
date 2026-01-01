"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Calculate grid positions for each image
  // Pattern: Left side (2x2, then 1x1+1x1), Right side (1x1+1x1, then 2x2)
  // This creates a 4-column grid where every 2 rows we have:
  // Row 1-2: [2x2 large] [1x1] [1x1]
  //          [2x2 large] [1x1] [1x1]
  // But the right side has: [1x1] [1x1] [2x2 large]
  //                         [1x1] [1x1] [2x2 large]

  const getGridStyle = (index: number) => {
    // Each complete pattern uses 6 images and spans 2 rows
    const patternIndex = index % 6;
    const patternGroup = Math.floor(index / 6);
    const baseRow = patternGroup * 2 + 1; // CSS grid rows are 1-indexed

    // Pattern layout:
    // 0: 2x2 at col 1-2, row 1-2 (left large)
    // 1: 1x1 at col 3, row 1 (top right of left section - but we want right side small)
    // 2: 1x1 at col 4, row 1 (top right)
    // 3: 1x1 at col 3, row 2 (bottom left of right section)
    // 4: 1x1 at col 4, row 2 (bottom right of right section)
    // 5: 2x2 at col 3-4, row 3-4 (right large) - but this breaks pattern

    // Let me reconsider - the desired pattern per 4 rows:
    // Rows 1-2: Large(2x2) at cols 1-2, Small(1x1) at col 3 row 1, Small at col 4 row 1, Small at col 3 row 2, Small at col 4 row 2
    // Rows 3-4: Small at col 1 row 3, Small at col 2 row 3, Small at col 1 row 4, Small at col 2 row 4, Large(2x2) at cols 3-4

    // So pattern is 10 images per 4 rows
    const fullPatternIndex = index % 10;
    const fullPatternGroup = Math.floor(index / 10);
    const fullBaseRow = fullPatternGroup * 4 + 1;

    switch (fullPatternIndex) {
      case 0: // 2x2 left
        return {
          gridColumn: "1 / 3",
          gridRow: `${fullBaseRow} / ${fullBaseRow + 2}`,
          isLarge: true
        };
      case 1: // 1x1 top col 3
        return {
          gridColumn: "3 / 4",
          gridRow: `${fullBaseRow} / ${fullBaseRow + 1}`,
          isLarge: false
        };
      case 2: // 1x1 top col 4
        return {
          gridColumn: "4 / 5",
          gridRow: `${fullBaseRow} / ${fullBaseRow + 1}`,
          isLarge: false
        };
      case 3: // 1x1 bottom col 3
        return {
          gridColumn: "3 / 4",
          gridRow: `${fullBaseRow + 1} / ${fullBaseRow + 2}`,
          isLarge: false
        };
      case 4: // 1x1 bottom col 4
        return {
          gridColumn: "4 / 5",
          gridRow: `${fullBaseRow + 1} / ${fullBaseRow + 2}`,
          isLarge: false
        };
      case 5: // 1x1 row 3 col 1
        return {
          gridColumn: "1 / 2",
          gridRow: `${fullBaseRow + 2} / ${fullBaseRow + 3}`,
          isLarge: false
        };
      case 6: // 1x1 row 3 col 2
        return {
          gridColumn: "2 / 3",
          gridRow: `${fullBaseRow + 2} / ${fullBaseRow + 3}`,
          isLarge: false
        };
      case 7: // 1x1 row 4 col 1
        return {
          gridColumn: "1 / 2",
          gridRow: `${fullBaseRow + 3} / ${fullBaseRow + 4}`,
          isLarge: false
        };
      case 8: // 1x1 row 4 col 2
        return {
          gridColumn: "2 / 3",
          gridRow: `${fullBaseRow + 3} / ${fullBaseRow + 4}`,
          isLarge: false
        };
      case 9: // 2x2 right
        return {
          gridColumn: "3 / 5",
          gridRow: `${fullBaseRow + 2} / ${fullBaseRow + 4}`,
          isLarge: true
        };
      default:
        return {
          gridColumn: "auto",
          gridRow: "auto",
          isLarge: false
        };
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[5px] p-[5px]">
        {images.map((img: string, index: number) => {
          const gridStyle = getGridStyle(index);

          return (
            <div
              key={index}
              className="relative cursor-pointer overflow-hidden group gallery-item"
              style={{
                "--grid-col": gridStyle.gridColumn,
                "--grid-row": gridStyle.gridRow,
                aspectRatio: "1 / 1"
              } as React.CSSProperties}
              onClick={() => openLightbox(index)}
            >
              <img
                src={img}
                alt={`${title} ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          );
        })}
      </div>

      <Lightbox
        images={images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={title}
      />
    </>
  );
}
