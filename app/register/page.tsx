"use client";
import Register from "@/components/Register";
import Home from "../page";
import React, { useState } from "react";

const RegisterPage = () => {
  const [isLogin, setLogin] = useState(true);
  const [open, setOpen] = useState(true);
  return (
    <Home open={open} setOpen={setOpen}>
      <Register isLogin={isLogin} setLogin={setLogin} />
    </Home>
  );
};

export default RegisterPage;
