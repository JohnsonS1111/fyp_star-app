"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import UserProfile from "../(components)/UserProfile";

const Profile = () => {
  
  return (
    <div className="flex flex-col">
     <UserProfile/>
    </div>
  );
};

export default Profile;
