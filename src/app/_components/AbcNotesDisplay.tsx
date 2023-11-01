"use client";
import ABCJS from "abcjs";
import { useEffect } from "react";

type NotesDisplayProps = {
  baseId: string;
  notes: string;
  wrap?: {
    minSpacing: number;
    maxSpacing: number;
    preferredMeasuresPerLine: number;
  };
  staffwidth?: number;
  responsive?: "resize";
};

export default function NotesDisplay({
  baseId,
  notes,
  wrap = undefined,
  staffwidth = undefined,
  responsive = undefined,
}: NotesDisplayProps) {
  const notesId = `${baseId}notes`;

  useEffect(() => {
    ABCJS.renderAbc(notesId, notes, {
      scale: 1.1,
      add_classes: true,
      paddingleft: 0,
      paddingright: 0,
      paddingbottom: 0,
      paddingtop: 0,
      wrap,
      staffwidth,
      responsive,
    });
  }, [notesId, notes, wrap, staffwidth, responsive]);

  return (
    <div className="notes -pl-2 h-[100px] overflow-x-scroll" id={notesId}></div>
  );
}
