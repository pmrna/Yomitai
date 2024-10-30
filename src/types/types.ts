export interface HomeProps {
  HandleSearch: (e: React.FormEvent) => void;
  search: string;
  mangaList: any[];
  recommendations: any[];
  SetSearch: (search: string) => void;
  setSelectedManga: (manga: MangaType | null) => void;
  selectedManga: MangaType | null;
}

export type MangaType = {
  mal_id: number;
  title: string;
  synopsis: string;
  genres: { name: string }[];
  images: { jpg: { image_url: string } };
};
