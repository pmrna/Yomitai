import React from "react";
import { ContentProps } from "../types/types";

const Content: React.FC<ContentProps> = ({
  selectedManga,
  recommendations,
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-10">
      <div>
        {selectedManga && (
          <>
            <img
              src={selectedManga.images.webp.image_url}
              alt={selectedManga.title}
            />
            <h2 className="flex items-center justify-center font-medium text-xl">
              {selectedManga.title}
            </h2>
          </>
        )}
      </div>
      <div className="w-full max-w-[40%]">
        <h2 className="font-bold text-xl mb-2">Synopsis</h2>
        <div className="space-y-5">
          {selectedManga && (
            <>
              <p className="text-base text-start break-words leading-relaxed tracking-tighter">
                {selectedManga.synopsis}
              </p>
              <p className="text-sm text-start font-medium italic">
                {selectedManga.genres.map((genre) => genre.name).join(", ")}
              </p>
            </>
          )}
        </div>
        // TODO: Add a function when clicking a manga from recommended.
        <h2 className="font-bold text-xl mt-5 mb-2">Recommended Manga</h2>
        <div className="w-full">
          <div className="flex overflow-x-auto gap-7 no-scrollbar">
            {recommendations.map((recommendation) => (
              <div
                key={recommendation.mal_id}
                className="flex flex-col items-center"
              >
                <img
                  src={recommendation.images.webp.large_image_url}
                  alt={recommendation.title}
                  className="w-12 h-20 rounded-lg object-cover hover:scale-105 transition-all duration-300"
                />
                <p className="text-start text-sm leading-none tracking-tighter">
                  {recommendation.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
