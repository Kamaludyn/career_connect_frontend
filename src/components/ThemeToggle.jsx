import { useState, useEffect } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeToggle() {
  // Defines the darkMode state and initialize it based on the value stored in localStorage
  // If the stored theme is "dark", darkMode will be true; otherwise, it will be false
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    // Check if darkMode is true
    if (darkMode) {
      // Add the "dark" class to the root HTML element (<html>)
      document.documentElement.classList.add("dark");

      // Store the theme preference ("dark") in the browser's local storage
      localStorage.setItem("theme", "dark");
    } else {
      // Remove the "dark" class from the root HTML element (<html>)
      document.documentElement.classList.remove("dark");

      // Store the theme preference ("light") in the browser's local storage
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
