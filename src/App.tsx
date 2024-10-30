import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import useDebounce from "./hooks/debounce";
import { MangaType } from "./types/types";

function App() {
  // bg: bg-gradient-to-b from-neutral-300 to-stone-400
  const [mangaList, setMangaList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedManga, setSelectedManga] = useState<MangaType | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  const HandleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    FetchManga(search);
  };

  const FetchRecommendations = async (selectedManga: MangaType | null) => {
    if (!selectedManga) return;

    try {
      // Fetch the full details of the selected manga to get its genres
      const fullResponse = await fetch(
        `https://api.jikan.moe/v4/manga/${selectedManga.mal_id}/full`
      );
      const fullData = await fullResponse.json();

      // Extract genre IDs from the selected manga
      const genreIDs = fullData.data.genres
        .map((genre: any) => genre.mal_id)
        .join(",");
      console.log("Selected manga genre IDs:", genreIDs);

      // Fetch manga based on the selected manga's genres
      const recommendationsResponse = await fetch(
        `https://api.jikan.moe/v4/manga?genres=${genreIDs}`
      );
      const recommendationsData = await recommendationsResponse.json();

      console.log("Raw recommendations:", recommendationsData.data);

      // Optionally, you can limit the number of recommendations
      const limitedRecommendations = recommendationsData.data.slice(0, 20);

      console.log(
        "Filtered recommendations (limited):",
        limitedRecommendations
      );
      setRecommendations(limitedRecommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const FetchManga = async (query: string) => {
    try {
      const temp = await fetch(
        `https://api.jikan.moe/v4/manga?q=${query}&sfw=true&order_by=title&sort=asc&limit=20`
      ).then((res) => res.json());

      setMangaList(temp.data);
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };

  useEffect(() => {
    if (selectedManga) {
      FetchRecommendations(selectedManga);
    }
  }, [selectedManga]);

  useEffect(() => {
    if (debouncedSearch) {
      FetchManga(debouncedSearch);
    } else {
      setMangaList([]);
    }
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <Home
        HandleSearch={HandleSearch}
        search={search}
        recommendations={recommendations}
        mangaList={mangaList}
        SetSearch={setSearch}
        setSelectedManga={setSelectedManga}
        selectedManga={selectedManga}
      />
    </div>
  );
}

export default App;
