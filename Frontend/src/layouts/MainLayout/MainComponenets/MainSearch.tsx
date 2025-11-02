import { Search, X } from "lucide-react";
import { useState } from "react";

const MainSearch = () => {
  const [search, setSearch] = useState("");

  return (
    <div
      className={`relative w-full flex items-center gap-2 px-2 border border-transparent bg-input rounded-md `}
    >
      <Search className="text-foreground" />
      <input
        type="text"
        className="w-full h-8 bg-transparent focus:outline-none  text-foreground"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search..."
      />
      <X
        className={` ${search.trim().length > 0 ? "block" : "hidden"} cursor-pointer hover:bg-accent hover:text-foreground/80 rounded-full p-0.5 active:bg-accent/30 active:text-foreground text-foreground`}
        onClick={() => setSearch("")}
      />
    </div>
  );
};

export default MainSearch;
