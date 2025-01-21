"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface StudentData {
  name: string;
  value: number;
  fill: string;
}

const studentData: StudentData[] = [
  {
    name: "Girls",
    value: 20000,
    fill: "#CB1212FF",
  },
  {
    name: "Boys",
    value: 30000,
    fill: "#0E25D5FF",
  },
];

function StudentSection() {
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
        <div className="flex items-center">
          <div className="w-3 sm:w-4 h-3 sm:h-4 bg-blue-500 rounded-full mr-2"></div>
          <p className="text-sm sm:text-base text-gray-600">30,000 Boys</p>
        </div>
        <div className="flex items-center">
          <div className="w-3 sm:w-4 h-3 sm:h-4 bg-red-500 rounded-full mr-2"></div>
          <p className="text-sm sm:text-base text-gray-600">20,000 Girls</p>
        </div>
      </div>
    </div>
  );
}

export default StudentSection;