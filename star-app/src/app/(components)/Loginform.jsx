"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; 
import React, { useEffect, useState } from "react";

const Loginform = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/login/", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Error logging in");
      }

      const data = await res.json();

      console.log("User login successful: ", data);
      document.cookie = `jwt=${data.token};`;

      // Clear form fields after successful login
      setEmail("");
      setPassword("");

      
      router.push("/TodosPage/new");
    } catch (error) {
      console.error("Login failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(email && password));
  }, [email, password]);

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-3 w-1/2" onSubmit={handleSubmit}>
        <h3 className="text-center pb-3 ">
          {loading ? "Processing" : "Login"}
        </h3>

        <label htmlFor="email">Email</label>
        <input
          className="p-2 text-slate-800"
          id="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your-email"
        />

        <label htmlFor="password">Password</label>
        <input
          className="p-2 text-slate-800"
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />

        <input
          type="submit"
          className="btn"
          value={buttonDisabled ? "No signup" : "Complete Login"}
          disabled={buttonDisabled} 
        />
        <Link href="/Signup" className=" justify-end">
          Not a member? Sign up here!
        </Link>
      </form>
    </div>
  );
};

export default Loginform;
