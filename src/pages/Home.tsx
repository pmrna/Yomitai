import placeholderData from "../assets/data/placeholders.json";
import { useEffect, useState } from "react";
import { HomeProps } from "../types/types";
import SearchBar from "../components/SearchBar";
import Content from "../components/Content";

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
    <main className="py-10 flex flex-col items-center justify-center h-[45rem] overflow-hidden">
      {props.selectedManga ? (
        <Content
          selectedManga={props.selectedManga}
          recommendations={props.recommendations}
          setSelectedManga={props.setSelectedManga}
        />
      ) : (
        <SearchBar
          search={props.search}
          placeholder={placeholder}
          SetSearch={props.SetSearch}
          HandleSearch={props.HandleSearch}
          isAnimating={isAnimating}
          visible={visible}
          mangaList={props.mangaList}
          setVisible={setVisible}
          setIsAnimating={setIsAnimating}
          setSelectedManga={props.setSelectedManga}
        />
      )}
    </main>
  );
}

export default Home;
