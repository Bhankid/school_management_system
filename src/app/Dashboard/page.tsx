"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EventCalendar from "../components/EventCalendar";
import Reminder from "../components/Reminder";
import Footer from "../components/Footer";
import Student from "../components/Student";
import AddStudent from "../components/AddStudent";
import StudentPromotion from "../components/StudentPromotion";
import Subject from "../components/Subject";
import Teacher from "../components/Teacher";
import Fees from "../components/Fees";
import AddFees from "../components/AddFees";
import Expense from "../components/Expense";
import AddExpense from "../components/AddExpense";
import AddTeacher from "../components/AddTeacher";
import AccountSettings from "../components/AccountSettings";
import Account from "../components/Account";
import Parent from "../components/Parent";
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Pie,
} from "recharts";

type ActiveTab =
  | "dashboard"
  | "students"
  | "add-student"
  | "student-promotion"
  | "parents"
  | "subjects"
  | "teachers"
  | "settings"
  | "fees-group"
  | "student-fees"
  | "add-fees"
  | "expenses"
  | "add-expenses"
  | "add-teacher";


const earningsData = [
  { day: "Mon", totalCollections: 85000, feesCollections: 70000 },
  { day: "Tue", totalCollections: 88000, feesCollections: 72000 },
  { day: "Wed", totalCollections: 86000, feesCollections: 71000 },
  { day: "Thu", totalCollections: 89000, feesCollections: 73000 },
  { day: "Fri", totalCollections: 87000, feesCollections: 74000 },
  { day: "Sat", totalCollections: 90000, feesCollections: 75000 },
  { day: "Sun", totalCollections: 92000, feesCollections: 76000 },
];

const expensesData = [
  { month: "April", expenses: 125000, color: "#0C9B40FF" },
  { month: "May", expenses: 100000, color: "#0E25D5FF" },
  { month: "June", expenses: 75000, color: "#D51212FF" },
];

const studentData = [
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

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("activeTab") as ActiveTab;
      return saved || "dashboard";
    }
    return "dashboard";
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const renderDashboardContent = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        {/* Students Statistics Card */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 sm:p-3 rounded-full w-10 sm:w-10 h-10 sm:h-10 flex items-center justify-center relative">
              <i className="fas fa-users text-green-500 text-sm sm:text-base"></i>
              <div className="absolute left-[40px] sm:left-[50px] top-1/2 transform -translate-y-1/2 h-6 sm:h-8 w-0.5 bg-red-500"></div>
            </div>
            <div className="ml-4 sm:ml-6">
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                Students
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                50000
              </p>
            </div>
          </div>
        </div>

        {/* Teachers Statistics Card */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 sm:p-3 rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center relative">
              <i className="fas fa-chalkboard-teacher text-blue-500 text-sm sm:text-base"></i>
              <div className="absolute left-[40px] sm:left-[50px] top-1/2 transform -translate-y-1/2 h-6 sm:h-8 w-0.5 bg-red-500"></div>
            </div>
            <div className="ml-4 sm:ml-6">
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                Teachers
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                1500
              </p>
            </div>
          </div>
        </div>

        {/* Parents Statistics Card */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full w-10 h-10 flex items-center justify-center relative">
              <i className="fas fa-user-friends text-yellow-500"></i>
              <div className="absolute left-[50px] top-1/2 transform -translate-y-1/2 h-8 w-0.5 bg-red-500"></div>
            </div>
            <div className="ml-6">
              <p className="text-gray-800 font-medium">Parents</p>
              <p className="text-2xl font-bold text-gray-900">60000</p>
            </div>
          </div>
        </div>

        {/* Earnings Statistics Card */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 sm:p-3 rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center relative">
              <i className="fas fa-dollar-sign text-red-500 text-sm sm:text-base"></i>
              <div className="absolute left-[40px] sm:left-[50px] top-1/2 transform -translate-y-1/2 h-6 sm:h-8 w-0.5 bg-red-500"></div>
            </div>
            <div className="ml-4 sm:ml-6">
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                Earnings
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                $200000
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Earnings Section */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 lg:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">
              Earnings
            </h2>
            <div className="text-sm sm:text-base text-gray-700">
              Jan 11, 2025
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-4">
            <div>
              <p className="text-gray-700 text-sm sm:text-base">
                Total Collections
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-500">
                $90,000
              </p>
            </div>
            <div>
              <p className="text-gray-700 text-sm sm:text-base">
                Fees Collections
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-500">
                $75,000
              </p>
            </div>
          </div>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `$${value}`}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalCollections"
                  name="Total Collections"
                  stroke="#0546D1FF"
                  strokeWidth={2}
                  dot={{ fill: "#074AD9FF" }}
                />
                <Line
                  type="monotone"
                  dataKey="feesCollections"
                  name="Fees Collections"
                  stroke="#C71013FF"
                  strokeWidth={2}
                  dot={{ fill: "#C60A0AFF" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">
              Expenses
            </h2>
            <div className="text-sm sm:text-base text-gray-600">Jan 2025</div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">April 2021</p>
              <p className="text-sm sm:text-base text-green-500">$125,000</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">May 2021</p>
              <p className="text-sm sm:text-base text-blue-600">$100,000</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">June 2021</p>
              <p className="text-sm sm:text-base text-red-600">$75,000</p>
            </div>
          </div>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expensesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `$${value}`}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="expenses"
                  name="Monthly Expenses"
                  radius={[4, 4, 0, 0]}
                  fill="#ef4444"
                >
                  {expensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Students Distribution Section */}
        <div className="bg-white p-4 rounded-lg shadow">
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

        {/* Event Calendar and Reminder Section */}
        <div className="lg:col-span-2 flex flex-col lg:flex-row gap-4 lg:gap-6">
          <EventCalendar />
          <Reminder />
        </div>
      </div>
    </>
  );

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <header className="mb-6">
              <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
              <nav className="text-gray-600">Home</nav>
            </header>
            {renderDashboardContent()}
          </>
        );
      case "students":
        return <Student />;
      case "add-student":
        return <AddStudent />;
      case "student-promotion":
        return <StudentPromotion />;
      case "parents":
        return <Parent />;
      case "subjects":
        return <Subject />;
      case "teachers":
        return <Teacher />;
      case "fees-group":
        return <Account />;
      case "student-fees":
        return <Fees />;
      case "add-fees":
        return <AddFees />;
      case "expenses":
        return <Expense />;
      case "add-expenses":
        return <AddExpense />;
      case "add-teacher":
        return <AddTeacher />;
      case "settings":
        return <AccountSettings />;
      default:
        return <div>Component not found</div>;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-blue-50">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="flex-1">
        <Header />
        <div className="p-6">{renderActiveComponent()}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
