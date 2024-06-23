"use client";
import React, { useEffect, useState } from "react";
import Login from "@/components/Login";
import Home from "../../page";

const LoginPage = () => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  },[])
  return (
    <Home open={open} setOpen={setOpen}>  
      <Login />
    </Home>
  );
};

export default LoginPage;
