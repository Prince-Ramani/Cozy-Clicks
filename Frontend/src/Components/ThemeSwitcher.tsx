import { Sun, MoonStar } from "lucide-react";
import { useTheme } from "./theme-provider";
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="p-2 hover:bg-accent hover:text-accent-foreground rounded-full active:bg-primary/40 active:text-primary-foreground/90 cursor-pointer"
      onClick={() => {
        if (theme === "dark") setTheme("light");
        else setTheme("dark");
      }}
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <MoonStar className=" size-5 " />
      )}
    </button>
  );
};

export default ThemeSwitcher;
