import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import axios from "axios";
import { updateUserField, setUser } from "../slices/userSlice";
//import { store } from "../store"; // adjust the path as needed


const ViewDetailsPage = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
const token = useSelector((state) => state.user.token);
  if (!user) {
    return <p className="p-4">No user logged in.</p>;
  }

const handleAvatarUpdate = async () => {
  try {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const { data } = await axios.put(
          "http://localhost:8000/api/v1/users/update-avatar",
          formData,
          {
            headers: {
             
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        alert("Avatar updated successfully!");
        dispatch(setUser(data.data)); // updates Redux for UI
      } catch (error) {
        console.error(error);
        alert(
          error?.response?.data?.message ||
            "Failed to update avatar. Please try again."
        );
      }
    };

    fileInput.click();
  } catch (error) {
    console.error(error);
    alert("Something went wrong while updating avatar.");
  }
};

  // const handlePasswordUpdate = async () => {
  //   const newPassword = prompt("Enter your new password:");
  //   if (!newPassword) return;
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.put(
  //       `http://localhost:8000/api/v1/users/update-password/${user._id}`,
  //       { password: newPassword }
  //     );
  //     alert("Password updated successfully");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to update password");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const handlePasswordUpdate = async () => {
  const currentPassword = prompt("Enter your current password:");
  if (!currentPassword) return;

  const newPassword = prompt("Enter your new password:");
  if (!newPassword) return;

  try {
    setLoading(true);

    const { data } = await axios.put(
      `http://localhost:8000/api/v1/users/change-password`,
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${user.token}`, // ensure token from context, Redux, or localStorage
        },
        withCredentials: true, // if your backend uses cookie auth
      }
    );

    alert(data?.message || "Password updated successfully");
  } catch (error) {
    console.error(error);
    alert(
      error?.response?.data?.message ||
      "Failed to update password"
    );
  } finally {
    setLoading(false);
  }
};





  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Details</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Full Name:</span>
            <span>{user.fullName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Username:</span>
            <span>{user.username}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Role:</span>
            <span>{user.role}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Avatar:</span>
            <img
              src={user.avatar || "https://via.placeholder.com/40"}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <label className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
              Update Avatar
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpdate}
                disabled={loading}
              />
            </label>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handlePasswordUpdate}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsPage;
