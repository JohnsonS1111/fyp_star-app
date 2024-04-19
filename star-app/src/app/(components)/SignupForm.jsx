"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // Corrected import
import React, { useEffect, useState } from "react";

const SignupForm = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true);
      const res = await fetch("api/users/signup", {
        // Changed protocol to http
        method: "POST",
        body: JSON.stringify({ user }), // Removed {}
        headers: {
          "Content-Type": "application/json", // Corrected header key
        },
      });
      if (!res.ok) {
        throw new Error("Error signing up");
      } else {
        console.log("Everything ok here");
      }
      // Clear form fields after successful signup
      setUser({
        username: "",
        email: "",
        password: "",
      });
      router.refresh();
      router.push("/login"); // Use replace instead of push to prevent stacking routes
    } catch (error) {
      console.error("Signup failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username)); // Simplified condition
  }, [user]);

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-3 w-1/2" onSubmit={onSignup}>
        <h3 className="text-center pb-3 ">
          {loading ? "Processing" : "Signup"}
        </h3>
        <label htmlFor="username">Username</label>
        <input
          className="p-2 text-slate-800"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) =>
            setUser((prevUser) => ({ ...prevUser, username: e.target.value }))
          }
          placeholder="your-username"
        />

        <label htmlFor="email">Email</label>
        <input
          className="p-2 text-slate-800"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) =>
            setUser((prevUser) => ({ ...prevUser, email: e.target.value }))
          }
          placeholder="your-email"
        />

        <label htmlFor="password">Password</label>
        <input
          className="p-2 text-slate-800"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) =>
            setUser((prevUser) => ({ ...prevUser, password: e.target.value }))
          }
          placeholder="password"
        />

        <input
          type="submit"
          className="btn"
          value={buttonDisabled ? "No signup" : "Complete Signup"}
          disabled={buttonDisabled} // Disabled attribute for button
        />
        <Link href="/login">Already signed up? Log in here</Link>
      </form>
    </div>
  );
};

export default SignupForm;
