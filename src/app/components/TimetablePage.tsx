"use client";

import { useState, useEffect } from "react";
import TimetableGrid from "./TimetableGrid";
import ExportOptions from "./ExportOptions";
import { generateTimetable, TimeSlot } from "@/lib/generateTimetable";

const TimetablePage = () => {
  const [timetable, setTimetable] = useState<{
    [className: string]: { [day: string]: TimeSlot[] };
  }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rawInput = localStorage.getItem("timetableInput");

      // Validate and parse input
      if (!rawInput) {
        throw new Error("No timetable input found. Please generate a timetable first.");
      }

      const input = JSON.parse(rawInput);

      if (
        !input.classes ||
        !input.subjects ||
        !input.timeDurations ||
        typeof input.classes !== "object" ||
        typeof input.subjects !== "object" ||
        typeof input.timeDurations !== "object"
      ) {
        throw new Error("Invalid timetable input structure.");
      }

      // Generate the timetable
      const generated = generateTimetable(input);

      if (!generated || Object.keys(generated).length === 0) {
        throw new Error("Timetable generation failed.");
      }

      setTimetable(generated);
      setError(null);
    } catch (err) {
      console.error("Error loading timetable:", err);
      setError("An error occurred while loading the timetable.");
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-red-500 text-center">
        School Timetable
      </h1>
      {error ? (
        <div className="bg-red-200 p-4 rounded text-red-800">{error}</div>
      ) : (
        <>
          <TimetableGrid timetable={timetable} />
          <ExportOptions timetable={timetable} />
        </>
      )}
    </div>
  );
};

export default TimetablePage;
