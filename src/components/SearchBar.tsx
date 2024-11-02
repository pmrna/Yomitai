import React from "react";
import { SearchBarProps } from "../types/types";
import { FaSearch } from "react-icons/fa";
import MangaCard from "./MangaCard";

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  placeholder,
  SetSearch,
  HandleSearch,
  isAnimating,
  visible,
  mangaList,
  setSelectedManga,
}) => {
  return (
    <>
      <div className="w-full max-w-[56.25rem]">
        <form onSubmit={HandleSearch}>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FaSearch className="w-4 h-4 text-gray-400" />
            </div>
            <input
              id="search"
              type="search"
              placeholder={placeholder}
              value={search}
              onChange={(e) => SetSearch(e.target.value)}
              required
              className="block w-full p-4 pl-10 text-sm border border-gray-600 rounded-md bg-gray-50 transition-colors duration-200 
            focus:ring-gray-500 focus:border-gray-500 focus:outline-none text-gray-800 placeholder-gray-500 
            focus:bg-gray-900 focus:text-white placeholder:placeholder-gray-500"
            />
          </div>
        </form>
      </div>
      <div
        className={`grid grid-cols-4 max-w-[56.25rem] w-full justify-items-center bg-gray-100 rounded-b-lg border border-gray-50 shadow-sm overflow-y-auto scrollbar-thin transition-all duration-200 ease-in-out  ${
          isAnimating
            ? visible
              ? "max-h-[125rem] opacity-100 p-5 gap-y-2"
              : "max-h-0 opacity-0"
            : "opacity-0"
        }`}
        style={{ height: visible ? "auto" : "0" }}
      >
        {mangaList.map((manga) => (
          <MangaCard
            manga={manga}
            key={manga.mal_id}
            onClick={() => setSelectedManga(manga)}
          />
        ))}
      </div>
    </>
  );
};

export default SearchBar;
