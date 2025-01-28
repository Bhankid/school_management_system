"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAllStudents } from "../actions/studentActions";
import { useState, useEffect } from "react";
import toastr from "toastr";

interface StudentData {
  name: string;
  value: number;
  fill: string;
}

function StudentSection() {
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getAllStudents();
        console.log(students);

        if (students.length === 0) {
          toastr.error("No students found!");
          return;
        }

        const boys = students.filter((student) => student.gender.toLowerCase() === "male").length;
        const girls = students.filter((student) => student.gender.toLowerCase() === "female").length;

        if (boys === 0 && girls === 0) {
          toastr.error("No boys or girls found!");
          return;
        }

        setStudentData([
          {
            name: "Boys",
            value: boys,
            fill: "#0E25D5FF",
          },
          {
            name: "Girls",
            value: girls,
            fill: "#CB1212FF",
          },
        ]);

        toastr.success("Students data fetched successfully!");
      } catch (error) {
        setError(error as string);
        toastr.error("Error fetching students data: " + (error as string));
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (studentData.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="bg-white p-0 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Students</h2>
      </div>

      <div className="h-[250px] sm:h-[300px] w-full">
        <ResponsiveContainer>
          <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <Pie
              data={studentData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              label
            >
              {studentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${value} students`}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 space-y-2 sm:space-y-0">
  {studentData.map((student, index) => (
    <div key={index} className="flex items-center">
      <div
        style={{ backgroundColor: student.fill }}
        className="w-3 sm:w-4 h-3 sm:h-4 rounded-full mr-2"
      ></div>
      <p className="text-sm sm:text-base text-gray-600">
        {student.name}: {student.value}
      </p>
    </div>
  ))}
</div>
    </div>
  );
}

export default StudentSection;