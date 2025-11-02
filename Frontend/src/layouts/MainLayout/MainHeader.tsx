import MainSearch from "./MainComponenets/MainSearch";

const Header = () => {
  return (
    <div className="flex w-full p-2 gap-1 sm:gap-2 md:gap-3 xl:gap-5 lg:gap-4 lg:px-4 items-center">
      <div className="flex gap-4 items-center justify-evenly min-w-fit">
        <span className=" text-green-500 font-bold text-2xl font-mono md:hidden">
          CC
        </span>
        <span className="text-green-500 font-bold hidden md:block lg:text-lg">
          Cozy-Clicks
        </span>
        <span className=" font-semibold  select-none hidden md:block text-sm 2xl:text-base cursor-pointer hover:bg-gray-300/70 rounded-full p-2 active:text-blue-500 transition-colors duration-150 ">
          Explore
        </span>
      </div>

      {/* Search Bar */}
      <MainSearch />

      {/* Buttons */}
      <div className="flex gap-1.5 sm:gap-2 items-center justify-center min-w-fit">
        <button className="bg-gray-300  p-1.5 lg:p-2 rounded-md text-xs font-medium hover:opacity-85 cursor-pointer active:bg-green-400/80 active:text-white">
          Log in
        </button>
        <button className="bg-red-600 text-white p-1.5 lg:p-2 rounded-md text-xs font-medium hover:opacity-85 cursor-pointer active:bg-green-400/80">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Header;
