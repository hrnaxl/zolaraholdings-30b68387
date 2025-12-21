import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("zolara-theme");
    if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.add("light-theme");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.add("light-theme");
      localStorage.setItem("zolara-theme", "light");
    } else {
      document.documentElement.classList.remove("light-theme");
      localStorage.setItem("zolara-theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center border border-border/50 hover:border-primary/50 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
      )}
    </button>
  );
};

export default ThemeToggle;
