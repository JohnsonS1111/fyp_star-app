"use client"

import Link from "next/link";
import { useRouter } from "next/navigation"; // Corrected import
import React, { useEffect, useState } from "react";

const Userform = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async (e) => {
    // Added parameter e
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true); // Corrected syntax
      const res = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({user}), // Removed {}
        headers: { "Content-Type": "application/json" }, // Corrected header key
      });
      if (!res.ok) {
        throw new Error("Error signing up");
      }
      router.push("/");
    } catch (error) {
      console.log("Signup failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username)); // Simplified condition
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure event target
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-3 w-1/2" onSubmit={onSignup}>
        <h3 className="text-center pb-3 ">
          {loading ? "Processing" : "Signup"}
        </h3>
        <label>Username</label>
        <input
          className="p-2 text-slate-800"
          id="username"
          name="username"
          title="username"
          type="text"
          value={user.username}
          onChange={handleChange}
          placeholder="username"
        />

        <label>Email</label>
        <input
          className="p-2 text-slate-800"
          id="email"
          title="email"
          name="email"
          type="text"
          value={user.email}
          onChange={handleChange}
          placeholder="email"
        />
        <label>Password</label>
        <input
          className="p-2 text-slate-800"
          id="password"
          title="password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          placeholder="password"
        />
        <input
          type="submit"
          className="btn"
          value={buttonDisabled ? "No signup" : "Complete Signup"}
          disabled={buttonDisabled} // Disabled attribute for button
        />
      </form>
      <Link href="/Login">Already signed up? Log in here</Link>
    </div>
  );
};

export default Userform;
