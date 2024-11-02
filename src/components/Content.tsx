import React from "react";
import { ContentProps } from "../types/types";
import RecommendationList from "./RecommendationList";

const Content: React.FC<ContentProps> = ({
  selectedManga,
  recommendations,
  setSelectedManga,
}) => {
  return (
    <div className="p-5 flex flex-row items-start justify-center gap-10 font-inter w-screen max-h-full">
      <div>
        {selectedManga && (
          <>
            <div className="mb-4 w-full max-w-[1000px] place-items-center">
              <img
                src={selectedManga.images.webp.image_url}
                alt={selectedManga.title}
                className="rounded-xl object-contain w-60 h-full"
              />
            </div>
            <h2 className="text-center text-xl font-bold">
              {selectedManga.title}
            </h2>
          </>
        )}
      </div>

      <div className="w-full max-w-[40%] h-full">
        <h2 className="font-bold text-xl mb-2">Synopsis</h2>
        <div className="space-y-5 mb-5">
          {selectedManga && (
            <>
              <div className="h-full max-h-48 overflow-y-auto">
                <p className="text-base leading-relaxed tracking-normal break-words text-justify">
                  {selectedManga.synopsis || "No synopsis available"}
                </p>
              </div>
              <p className="text-sm font-medium italic text-gray-600">
                {selectedManga.genres.map((genre) => genre.name).join(", ")}
              </p>
            </>
          )}
        </div>

        <h2 className="font-bold text-xl mb-2">Recommended Manga</h2>
        <RecommendationList
          recommendations={recommendations}
          onClick={setSelectedManga}
        />
      </div>
    </div>
  );
};

export default Content;
