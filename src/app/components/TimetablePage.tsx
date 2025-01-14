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
      if (!rawInput) throw new Error("No timetable input found.");
      const input = JSON.parse(rawInput);
      setTimetable(generateTimetable(input));
    } catch {
      setError("Failed to generate timetable.");
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
