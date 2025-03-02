"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StudentStatsCard from "../components/StudentstatsCard";
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
import TimetablePage from "../components/TimetablePage";
import GenerateTimetable from "../components/GenerateTimetable";
import TeacherStatsCard from "../components/TeacherStatsCard";
import ParentStatsCard from "../components/ParentStatsCard";
import EarningsStatsCard from "../components/EarningsStatsCard";
import EarningsSection from "../components/EarningsSection";
import ExpenseSection from "../components/ExpenseSection";
import StudentSection from "../components/StudentSection";

// Export the ActiveTab type
export type ActiveTab =
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
  | "add-teacher"
  | "timetable"
  | "generate-timetable";

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
          <StudentStatsCard />
        </div>

        {/* Teachers Statistics Card */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <TeacherStatsCard />
        </div>

        {/* Parents Statistics Card */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <ParentStatsCard />
        </div>

        {/* Earnings Statistics Card */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <EarningsStatsCard />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Earnings Section */}
        <div className="bg-white p-2 rounded-lg shadow col-span-1 lg:col-span-2">
          <EarningsSection />
        </div>

        {/* Expenses Section */}
        <div className="bg-white p-2 rounded-lg shadow">
          <ExpenseSection />
        </div>

        {/* Students Distribution Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <StudentSection />
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
      case "timetable":
        return <TimetablePage />;
      case "generate-timetable":
        return <GenerateTimetable />;
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
        return (
          <AddExpense
            onAdd={(expense) => {
              console.log("New Expense Added:", expense);
            }}
          />
        );
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
        <Header setActiveTab={setActiveTab} /> {/* Pass setActiveTab */}
        <div className="p-6">{renderActiveComponent()}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;