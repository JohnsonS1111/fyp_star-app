"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Loginform = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div>
        <h2 className="text-center pb-3 ">Login </h2>
      
      <form className="flex flex-col gap-3 w-1/2 text-center" method="post">
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
          name="pssword"
          type="password"
          value={user.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button onClick={onLogin} className="btn">
          Login
        </button>
        <Link href="/Signup ">Not signed up yet? Sign up here </Link>
      </form>
    </div>
  );
};

export default Loginform;
