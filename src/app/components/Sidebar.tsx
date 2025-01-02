import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="w-64  min-h-screen bg-blue-900 text-white sticky">
      <div className="bg-red-600 p-4 flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <i className="fas fa-bars"></i>
      </div>
      <ul className="mt-4">
        <li className="flex items-center p-4 hover:bg-blue-800 cursor-pointer">
          <i className="fas fa-tachometer-alt mr-3"></i>
          <span>Dashboard</span>
        </li>
        <li className="flex items-center p-4 hover:bg-blue-800 cursor-pointer">
          <i className="fas fa-users mr-3"></i>
          <span>Students</span>
          <i className="fas fa-chevron-right ml-auto"></i>
        </li>
        <li className="flex items-center p-4 hover:bg-blue-800 cursor-pointer">
          <i className="fas fa-user-friends mr-3"></i>
          <span>Parents</span>
        </li>
        <li className="flex items-center p-4 hover:bg-blue-800 cursor-pointer">
          <i className="fas fa-chalkboard-teacher mr-3"></i>
          <span>Teachers</span>
          <i className="fas fa-chevron-right ml-auto"></i>
        </li>
        <li className="flex items-center p-4 hover:bg-blue-800 cursor-pointer">
          <i className="fas fa-user-circle mr-3"></i>
          <span>Account</span>
          <i className="fas fa-chevron-right ml-auto"></i>
        </li>
        <li className="flex items-center p-4 hover:bg-blue-800 cursor-pointer">
          <i className="fas fa-book mr-3"></i>
          <span>Subject</span>
        </li>
        <li className="flex items-center p-4 hover:bg-blue-800 cursor-pointer">
          <i className="fas fa-cog mr-3"></i>
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
