import { Search, X } from "lucide-react";
import { useState } from "react";

const MainSearch = () => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div
      className={` relative w-full px-2  flex items-center gap-2 border border-transparent bg-slate-200 ${isFocused ? "rounded-t-lg " : "rounded-lg"}`}
    >
      <Search className="text-gray-600" />
      <input
        type="text"
        className="w-full h-8 bg-transparent focus:outline-none  "
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={search}
      />
      <X
        className={`hidden ${search.trim().length > 0 ? "md:block" : "hidden"} cursor-pointer hover:bg-white/50 hover:text-gray-600 rounded-full p-1 size-6 active:bg-blue-500/40 active:text-white  text-gray-600 `}
        onClick={() => setSearch("")}
      />
      {isFocused ? (
        <div
          className={`absolute top-8 right-0 bottom-0 z-50 w-full h-full bg-slate-200 border-t border-neutral-400 rounded-b-lg `}
        >
          Hello
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MainSearch;
