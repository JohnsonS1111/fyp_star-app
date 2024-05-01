import { useRouter } from "next/navigation";
import React from "react";

const UserProfile = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/logout/", 
      {
        method: "GET"
      });
      router.push("/Login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div>UserProfile</div>
      <div>
        <button
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
