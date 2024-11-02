function MangaCard({ manga, onClick }: { manga: any; onClick: () => void }) {
  return (
    <article onClick={onClick} className="cursor-pointer">
      <a target="_blank">
        <figure>
          <div className="w-32 h-full">
            <img
              src={manga.images.webp.image_url}
              alt="Manga Covers"
              className="w-full h-50 rounded-lg object-contain hover:scale-105 transition-all duration-300"
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
