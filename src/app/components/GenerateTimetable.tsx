"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SubjectInfo {
  subject: string;
  teacher: string;
  occurrences: number; // Number of times the subject should appear in a week
}

const GenerateTimetable = () => {
  const [classes, setClasses] = useState<string[]>([]);
  const [subjectInputs, setSubjectInputs] = useState<SubjectInfo[]>([]);
  const [newClass, setNewClass] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Add a new class to the list
  const addClass = () => {
    if (newClass.trim() && !classes.includes(newClass.trim())) {
      setClasses((prevClasses) => [...prevClasses, newClass.trim()]);
      setNewClass("");
    } else if (classes.includes(newClass.trim())) {
      setError(`Class "${newClass.trim()}" already exists.`);
    }
  };

  // Add a new subject entry
  const addSubject = () => {
    setSubjectInputs((prevSubjects) => [
      ...prevSubjects,
      { subject: "", teacher: "", occurrences: 1 },
    ]);
  };

  // Validate and generate timetable
  const handleGenerate = () => {
    setError(null);

    // Validate input
    if (!classes.length || !subjectInputs.length) {
      setError("Please add at least one class and one subject.");
      return;
    }

    if (subjectInputs.some((s) => !s.subject || !s.teacher)) {
      setError("All subjects must have a name and an assigned teacher.");
      return;
    }

    // Prepare input for timetable generation
    const input = {
      classes,
      subjects: subjectInputs,
      timeDurations: {
        Break: 15,
        Assembly: 20,
        "Lesson 1": 45,
        "Lesson 2": 45,
        "Lesson 3": 45,
        Lunch: 30,
        "Lesson 4": 45,
        "Lesson 5": 45,
        "Lesson 6": 45,
      },
    };

    // Store input in localStorage
    localStorage.setItem("timetableInput", JSON.stringify(input));
    router.push("/TimetablePage"); // Navigate to the timetable page
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-500 text-center">
        Generate Timetable
      </h1>
      <div className="grid grid-cols-1 gap-4">
        {/* Class Input */}
        <div>
          <input
            type="text"
            placeholder="Enter a class (e.g., Grade 1)"
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={addClass}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
          >
            Add Class
          </button>
        </div>
        {classes.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-800">Added Classes:</h2>
            <ul className="list-disc pl-6">
              {classes.map((c, idx) => (
                <li key={idx} className="text-gray-700">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Subject Input */}
        <button
          onClick={addSubject}
          className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded"
        >
          Add Subject
        </button>
        {subjectInputs.map((input, idx) => (
          <div key={idx} className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Subject"
              value={input.subject}
              onChange={(e) => {
                const updated = [...subjectInputs];
                updated[idx].subject = e.target.value;
                setSubjectInputs(updated);
              }}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Teacher"
              value={input.teacher}
              onChange={(e) => {
                const updated = [...subjectInputs];
                updated[idx].teacher = e.target.value;
                setSubjectInputs(updated);
              }}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Occurrences (1-5)"
              value={input.occurrences}
              min="1"
              max="5"
              onChange={(e) => {
                const updated = [...subjectInputs];
                updated[idx].occurrences = Number(e.target.value);
                setSubjectInputs(updated);
              }}
              className="border p-2 rounded"
            />
          </div>
        ))}

        {/* Error Message */}
        {error && (
          <div className="bg-red-200 text-red-700 p-2 rounded">{error}</div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Generate Timetable
        </button>
      </div>
    </div>
  );
};

export default GenerateTimetable;
