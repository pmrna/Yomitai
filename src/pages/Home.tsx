import { FaSearch } from "react-icons/fa";
import placeholderData from "../assets/data/placeholders.json";
import { useEffect, useState } from "react";
import { HomeProps } from "../types/types";
import MangaCard from "../components/MangaCard";

function Home(props: HomeProps) {
  const placeholders = placeholderData.placeholders;
  const randomPlaceholder =
    placeholders[Math.floor(Math.random() * placeholders.length)];

  const [placeholder, _] = useState(randomPlaceholder);
  const [visible, setVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (props.search) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setVisible(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [props.search]);

  return (
    <main className="py-10 flex flex-col items-center justify-center h-[32rem] overflow-hidden">
      {props.selectedManga ? (
        <div className="flex flex-row items-center justify-center gap-10">
          <div>
            <img
              src={props.selectedManga.images.jpg.image_url}
              alt="manga logo"
            />
            <h2 className="flex items-center justify-center font-medium text-xl">
              {props.selectedManga.title}
            </h2>
          </div>
          <div className="w-full max-w-[40%]">
            <h2 className="font-bold text-xl mb-2">Synopsis</h2>
            <div className="space-y-5">
              <p className="text-base text-start break-words leading-relaxed tracking-tighter">
                {props.selectedManga.synopsis}
              </p>
              <p className="text-sm text-start font-medium italic">
                {props.selectedManga.genres
                  .map((genre) => genre.name)
                  .join(", ")}
              </p>
            </div>
            <div>
              {props.recommendations.map((reccomend) => reccomend.title)}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="max-w-full w-[40%]">
            <form onSubmit={props.HandleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <FaSearch className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  id="search"
                  type="search"
                  placeholder={placeholder}
                  value={props.search}
                  onChange={(e) => props.SetSearch(e.target.value)}
                  required
                  className="block w-full p-4 pl-10 text-sm border border-gray-600 rounded-md bg-gray-50 transition-colors duration-200 
             focus:ring-gray-500 focus:border-gray-500 focus:outline-none text-gray-800 placeholder-gray-500 
             focus:bg-gray-900 focus:text-white placeholder:placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div
            className={`mt-2 px-2 grid grid-cols-4 max-w-[70%] gap-x-10 overflow-y-auto transition-all duration-500 ease-in-out ${
              isAnimating
                ? visible
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
                : "opacity-0"
            }`}
            style={{ height: visible ? "auto" : "0" }}
          >
            {props.mangaList.map((manga) => (
              <MangaCard
                manga={manga}
                key={manga.mal_id}
                onClick={() => props.setSelectedManga(manga)}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Home;
