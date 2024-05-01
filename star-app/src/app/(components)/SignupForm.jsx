"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignupForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log(username);
    console.log(email);
    console.log(password);

    e.preventDefault();
    try {
      setLoading(true);
      const resT = await fetch("http://localhost:5000/signup/checkUser", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resT.ok) {
        throw new Error("Error signing up");
      }

      const res = await fetch("http://localhost:5000/signup/", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Error signing up");
      }
      // Clear form fields after successful signup

      setEmail("");
      setUsername("");
      setPassword("");

      router.refresh();
      router.push("/Login");
    } catch (error) {
      console.error("Signup failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(username && email && password));
  }, [username, email, password]);

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-3 w-1/2" onSubmit={handleSubmit}>
        <h3 className="text-center pb-3 ">
          {loading ? "Processing" : "Signup"}
        </h3>
        <label htmlFor="username">Username</label>
        <input
          className="p-2 text-slate-800"
          id="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="your-username"
        />

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
          value={buttonDisabled ? "No signup" : "Complete Signup"}
          disabled={buttonDisabled}
        />
        <Link href="/Login">Already signed up? Log in here</Link>
      </form>
    </div>
  );
};

export default SignupForm;
