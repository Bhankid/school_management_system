"use client";

import React from "react";
import { CSVLink } from "react-csv";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface TimeSlot {
  startTime: string;
  endTime: string;
  activity: string;
}

interface ExportOptionsProps {
  timetable: { [className: string]: { [day: string]: TimeSlot[] } };
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ timetable }) => {
  // CSV Export Logic
  const headers = ["Class", "Day", "Start Time", "End Time", "Activity"];
  const data = Object.entries(timetable).flatMap(([className, days]) =>
    Object.entries(days).flatMap(([day, slots]) =>
      slots.map((slot) => [
        className,
        day,
        slot.startTime,
        slot.endTime,
        slot.activity,
      ])
    )
  );

  // PDF Export Logic
  const exportToPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const addTimetablePage = async (className: string, days: { [day: string]: TimeSlot[] }) => {
      const page = pdfDoc.addPage([600, 800]);
      const { height } = page.getSize();
      const fontSize = 18;
      const margin = 50;

      // Add class name
      page.drawText(`Class: ${className}`, {
        x: margin,
        y: height - margin,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      let yOffset = height - margin - 30;

      Object.entries(days).forEach(([day, slots]) => {
        // Add day
        page.drawText(`${day}`, {
          x: margin,
          y: yOffset,
          size: fontSize - 4,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        yOffset -= 20;

        // Add table headers
        page.drawText("Start Time", {
          x: margin,
          y: yOffset,
          size: fontSize - 6,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        page.drawText("End Time", {
          x: margin + 150,
          y: yOffset,
          size: fontSize - 6,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        page.drawText("Activity", {
          x: margin + 300,
          y: yOffset,
          size: fontSize - 6,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        yOffset -= 20;

        // Add table rows
        slots.forEach((slot) => {
          page.drawText(slot.startTime, {
            x: margin,
            y: yOffset,
            size: fontSize - 6,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
          });
          page.drawText(slot.endTime, {
            x: margin + 150,
            y: yOffset,
            size: fontSize - 6,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
          });
          page.drawText(slot.activity, {
            x: margin + 300,
            y: yOffset,
            size: fontSize - 6,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
          });

          yOffset -= 20;
        });

        yOffset -= 20; // Add extra space between days
      });
    };

    // Add pages for each class
    Object.entries(timetable).forEach(([className, days]) => {
      addTimetablePage(className, days);
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "school_timetable.pdf";
    link.click();
  };

  if (data.length === 0) {
    return <div>No data to export.</div>;
  }

  return (
    <div className="mt-4 flex space-x-4">
 <CSVLink
        data={[headers, ...data]}
        filename="timetable.csv"
        className="bg-blue-700 text-white px-4 py-2 rounded"
      >
        Export CSV
      </CSVLink>

      <button
        onClick={exportToPDF}
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
      >
        Export to PDF
      </button>
    </div>
  );
};

export default ExportOptions;