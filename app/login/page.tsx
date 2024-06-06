"use client";
import React, { useState } from "react";
import Login from "@/components/Login";
import Home from "../page";

const LoginPage = () => {
  const [isLogin, setLogin] = useState(true);
  const [open, setOpen] = useState(true);
  return (
    <Home open={open} setOpen={setOpen}>
      <Login isLogin={isLogin} setLogin={setLogin} />
    </Home>
  );
};

export default LoginPage;
