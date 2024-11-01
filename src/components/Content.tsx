import React from "react";
import { ContentProps } from "../types/types";
import RecommendationList from "./RecommendationList";

const Content: React.FC<ContentProps> = ({
  selectedManga,
  recommendations,
  setSelectedManga,
}) => {
  return (
    <div className="flex flex-row items-start justify-center gap-10 font-inter w-screen">
      <div>
        {selectedManga && (
          <>
            <div className="mb-4">
              <img
                src={selectedManga.images.webp.image_url}
                alt={selectedManga.title}
                className="rounded-xl object-contain w-full h-auto"
              />
            </div>
            <h2 className="text-center font-medium text-xl mb-3">
              {selectedManga.title}
            </h2>
          </>
        )}
      </div>

      <div className="w-full max-w-[40%]">
        <h2 className="font-bold text-xl mb-2">Synopsis</h2>
        <div className="space-y-5 mb-5">
          {selectedManga && (
            <>
              <p className="text-base leading-relaxed tracking-normal break-words">
                {selectedManga.synopsis || "No synopsis available"}
              </p>
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
