import Image from "next/image";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EventCalendar from "../components/EventCalendar";
import Reminder from "../components/Reminder";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>

            <nav className="text-gray-600">Home</nav>
          </header>

          {/* Statistics Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Students Statistics Card */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full relative">
                  <i className="fas fa-users text-green-500"></i>
                  <div className="absolute left-[60px] top-1/2 transform -translate-y-1/2 h-8 w-0.5 bg-red-500"></div>
                </div>
                <div className="ml-6">
                  <p className="text-gray-800 font-medium">Students</p>
                  <p className="text-2xl font-bold text-gray-900">50000</p>
                </div>
              </div>
            </div>

            {/* Teachers Statistics Card */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full relative">
                  <i className="fas fa-chalkboard-teacher text-blue-500"></i>
                  <div className="absolute left-[60px] top-1/2 transform -translate-y-1/2 h-8 w-0.5 bg-red-500"></div>
                </div>
                <div className="ml-6">
                  <p className="text-gray-800 font-medium">Teachers</p>
                  <p className="text-2xl font-bold text-gray-900">1500</p>
                </div>
              </div>
            </div>

            {/* Parents Statistics Card */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full relative">
                  <i className="fas fa-user-friends text-yellow-500"></i>
                  <div className="absolute left-[60px] top-1/2 transform -translate-y-1/2 h-8 w-0.5 bg-red-500"></div>
                </div>
                <div className="ml-6">
                  <p className="text-gray-800 font-medium">Parents</p>
                  <p className="text-2xl font-bold text-gray-900">60000</p>
                </div>
              </div>
            </div>

            {/* Earnings Statistics Card */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="bg-red-100 p-3 rounded-full relative">
                  <i className="fas fa-dollar-sign text-red-500"></i>
                  <div className="absolute left-[50px] top-1/2 transform -translate-y-1/2 h-8 w-0.5 bg-red-500"></div>
                </div>
                <div className="ml-6">
                  <p className="text-gray-800 font-medium">Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">$200000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg shadow col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Earnings</h2>
                <div className="text-gray-600">June 10, 2021</div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-600">Total Collections</p>
                  <p className="text-2xl font-bold">$90,000</p>
                </div>
                <div>
                  <p className="text-gray-600">Fees Collections</p>
                  <p className="text-2xl font-bold">$75,000</p>
                </div>
              </div>
              <Image
                src="/earnings-graph.png"
                alt="Graph showing earnings over a week"
                width={600}
                height={300}
                className="w-full"
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Expenses</h2>
                <div className="text-gray-600">June 2021</div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-600">April 2021</p>
                  <p className="text-green-500">$125,000</p>
                </div>
                <div>
                  <p className="text-gray-600">May 2021</p>
                  <p className="text-blue-500">$100,000</p>
                </div>
                <div>
                  <p className="text-gray-600">June 2021</p>
                  <p className="text-red-500">$75,000</p>
                </div>
              </div>
              <Image
                src="/expenses-graph.png"
                alt="Graph showing expenses over three months"
                width={300}
                height={300}
                className="w-full"
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Students</h2>
              </div>
              <Image
                src="/students-chart.png"
                alt="Pie chart showing student distribution"
                width={300}
                height={300}
                className="w-full"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <p className="text-gray-600">30,000</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <p className="text-gray-600">20,000</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 flex gap-6">
              <EventCalendar />
              <Reminder />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
