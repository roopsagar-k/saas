"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Moon, Origami, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const LandingNav = ({ children }: { children?: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  function toggleTheme(): void {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const response = await fetch("/api/admin");
    console.log(response);
    if (response.status === 401) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  };

  return (
    <main>
      <div className="fixed top-0 left-0 right-0 w-full grid grid-cols-3 px-2 py-4 bg-transparent backdrop-blur-sm">
          <div className="logo flex gap-2 items-center text-primary text-xl">
            <Origami className="w-8 h-8" />
            <p className="font-semibold">Question Paper Hub</p>
          </div>
        <div className="flex gap-4 items-center font-medium justify-center">
          <Link href={"/"} className="ladingNavLink">
            Pricing
          </Link>
          <Link href={"/"} className="ladingNavLink">
            About
          </Link>
          <Link href={"/"} className="ladingNavLink">
            Documetion
          </Link>
          <Link href={"/"} className="ladingNavLink">
            Features
          </Link>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Button
            onClick={(e) => handleLogin(e)}
            className="bg-primary px-3 py-2"
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="px-4 py-6"
            onClick={() => toggleTheme()}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default LandingNav;
