import { useNavigate } from "react-router-dom";
import MainSearch from "./MainComponenets/MainSearch";
import { useAuthUser } from "@/context/userContextProvider";
import ThemeSwitcher from "@/Components/ThemeSwitcher";

const Header = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthUser();

  return (
    <div className="flex w-full p-2 gap-1 sm:gap-2 md:gap-3 xl:gap-5 lg:gap-4 lg:px-4 items-center">
      {/* Logo + Explore */}
      <div className="flex gap-4 items-center justify-evenly min-w-fit">
        <span className="text-primary font-bold text-2xl font-mono md:hidden">
          CC
        </span>
        <span className="text-primary font-bold hidden md:block lg:text-lg">
          Cozy-Clicks
        </span>
        <span className="font-semibold select-none hidden md:block text-sm 2xl:text-base cursor-pointer hover:bg-accent rounded-full p-2 active:text-primary transition-colors duration-150">
          Explore
        </span>
      </div>

      {/* Search Bar */}
      <MainSearch />

      {!authUser || !authUser._id ? (
        <div className="flex gap-1.5 sm:gap-2 items-center justify-center min-w-fit">
          <button
            className="bg-secondary text-secondary-foreground p-1.5 lg:p-2 rounded-md text-xs font-medium hover:opacity-90 cursor-pointer active:bg-accent/70 active:text-accent-foreground/70 transition-colors duration-150"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
          <button
            className="bg-primary text-primary-foreground p-1.5 lg:p-2 rounded-md text-xs font-medium hover:opacity-90 cursor-pointer active:bg-accent/70 active:text-accent-foreground/70 transition-colors duration-150"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      ) : (
        <ThemeSwitcher />
      )}
    </div>
  );
};

export default Header;
