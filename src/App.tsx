import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import useDebounce from "./hooks/debounce";
import { MangaType } from "./types/types";

function App() {
  const [mangaList, setMangaList] = useState([]);
  const [recommendations, setRecommendations] = useState<MangaType[]>([]);
  const [search, setSearch] = useState("");
  const [selectedManga, setSelectedManga] = useState<MangaType | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  const HandleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    FetchManga(search);
  };

  const FetchRecommendations = async (selectedManga: MangaType | null) => {
    if (
      !selectedManga ||
      !selectedManga.genres ||
      selectedManga.genres.length === 0
    )
      return;

    function getGenres(selectedMangaGenres: any[], randomCount: number) {
      const prominentGenre = selectedMangaGenres[0]?.mal_id || null;

      const otherGenres = selectedMangaGenres
        .slice(1)
        .sort(() => 0.5 - Math.random());

      const randomGenres = otherGenres
        .slice(0, randomCount)
        .map((genre) => genre.mal_id);

      return [prominentGenre, ...randomGenres]
        .filter((id) => id !== null)
        .join(",");
    }

    // shuffle genres
    // function getSimilarGenres(selectedMangaGenres: any[], count: number) {
    //   const shuffledGenres = selectedMangaGenres.sort(
    //     () => 0.5 - Math.random()
    //   );
    //   return shuffledGenres
    //     .slice(0, count)
    //     .map((genre) => genre.mal_id)
    //     .join(",");
    // }

    try {
      const genreIDs = getGenres(selectedManga.genres, 2);

      const recommendationsGenreResponse = await fetch(
        `https://api.jikan.moe/v4/manga?genres=${genreIDs}&sfw=true`
      );
      const genreRecommendationsData =
        await recommendationsGenreResponse.json();
      const genreRecommendations = genreRecommendationsData.data || [];

      let combinedRecommendations = genreRecommendations.filter(
        (manga: MangaType) => manga.mal_id !== selectedManga.mal_id
      );

      if (genreRecommendations.length < 10) {
        const recommendationsMangaResponse = await fetch(
          `https://api.jikan.moe/v4/manga/${selectedManga.mal_id}/recommendations`
        );
        const userRecommendationsData =
          await recommendationsMangaResponse.json();
        const userRecommendations = userRecommendationsData.data || [];

        const uniqueRecommendations = new Map();
        [...genreRecommendations, ...userRecommendations].forEach(
          (recommendation: any) => {
            uniqueRecommendations.set(recommendation.mal_id, recommendation);
          }
        );

        combinedRecommendations = Array.from(
          uniqueRecommendations.values()
        ).filter((manga: MangaType) => manga.mal_id !== selectedManga.mal_id);
      }

      setRecommendations(combinedRecommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendations([]);
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
