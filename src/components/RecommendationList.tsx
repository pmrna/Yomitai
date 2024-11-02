import { RecommendationListProps } from "../types/types";

const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  onClick,
}) => {
  return (
    <div className="flex overflow-x-auto gap-10 p-3">
      {recommendations.map((recommendation: any) => {
        const isUserRecommendation = recommendation.entry !== undefined;
        const mangaData = isUserRecommendation
          ? recommendation.entry
          : recommendation;

        return (
          <div
            key={mangaData.mal_id}
            className="flex flex-col items-center flex-shrink-0 w-20"
            onClick={() => onClick(mangaData)}
          >
            <img
              src={mangaData.images.webp.large_image_url}
              alt={mangaData.title}
              className="h-32 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
            <p className="text-center text-sm font-medium mt-2 line-clamp-2">
              {mangaData.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendationList;
