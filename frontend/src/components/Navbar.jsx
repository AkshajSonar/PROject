// import React from "react";

// const Navbar = ({ user }) => {
//   return (
//     <nav className="bg-white shadow flex items-center justify-between px-4 py-2 sticky top-0 z-50">
//        {/* Placeholder for right side buttons if needed */}
//       <div></div>

//       <h1 className="text-lg md:text-2xl font-bold text-gray-800">Admin Dashboard</h1>

     
//       <div className="flex items-center space-x-3">
//         {user?.avatar && (
//           <img
//             src={user.avatar}
//             alt="Avatar"
//             className="w-10 h-10 rounded-full object-cover border border-gray-300"
//           />
//         )}
//         <div>
//           <p className="text-gray-800 font-medium">{user?.fullName}</p>
//           <p className="text-sm text-gray-500">{user?.role?.toUpperCase()}</p>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, User } from "lucide-react";

const Navbar = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/view-details"); // or /admin/profile depending on your routes
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow flex items-center justify-between px-4 py-2 sticky top-0 z-50">
      <h1 className="text-lg md:text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          {user?.avatar && (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
          )}
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
            <button
              onClick={handleProfile}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="w-4 h-4 mr-2" />
              View Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;






// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { clearUser } from "../slices/userSlice";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const user = useSelector((state) => state.user.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleLogout = () => {
//     dispatch(clearUser());
//     navigate("/login");
//   };

//   return (
//     <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-md">
//       <h1 className="text-xl font-bold">Admin Dashboard</h1>
//       {user && (
//         <div className="relative">
//           <img
//             src={user.avatarUrl || "https://via.placeholder.com/40"}
//             alt="avatar"
//             className="w-10 h-10 rounded-full cursor-pointer"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           />
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
//               <button
//                 onClick={() => {
//                   navigate("/view-details");
//                   setDropdownOpen(false);
//                 }}
//                 className="block px-4 py-2 w-full text-left hover:bg-gray-100"
//               >
//                 View Details
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="block px-4 py-2 w-full text-left hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
