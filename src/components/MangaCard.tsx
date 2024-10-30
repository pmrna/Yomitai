function MangaCard({ manga, onClick }: { manga: any; onClick: () => void }) {
  return (
    <article onClick={onClick} className="cursor-pointer">
      <a target="_blank">
        <figure>
          <div className="flex flex-col items-start justify-start ">
            <img
              src={manga.images.jpg.image_url}
              alt="Manga Covers"
              className="w-32 h-40 rounded-lg object-cover  hover:scale-105 transition-all duration-300"
            />
            <h3 className="my-1 block w-full max-w-36 break-words leading-snug tracking-tight text-pretty text-sm font-medium">
              {manga.title}
            </h3>
          </div>
        </figure>
      </a>
    </article>
  );
}

export default MangaCard;
