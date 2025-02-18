import { useState, useEffect } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="transition-all p-1 md:text-lg font-bold text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
    >
      {darkMode ? <BsSun /> : <BsMoon />}
    </button>
  );
}
