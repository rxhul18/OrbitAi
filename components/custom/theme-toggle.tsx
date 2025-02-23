"use client";
import React from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Button
        variant="default"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <div className="relative">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
          <MoonStar className="absolute top-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {/* <FaSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <FaMoon className="absolute top-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
        </div>
      </Button>
    </>
  );
}

export default ThemeToggle;
