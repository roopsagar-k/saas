"use client";
import Register from "@/components/Register";
import Home from "@/app/page";
import React, { useState } from "react";

const RegisterPage = () => {
  const [open, setOpen] = useState(true);
  return (
    <Home open={open} setOpen={setOpen}>
      <Register />
    </Home>
  );
};

export default RegisterPage;
