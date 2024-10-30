import React from "react";

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
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
};

export interface SearchBarProps {
  search: string;
  placeholder: string;
  SetSearch: (search: string) => void;
  HandleSearch: (event: React.FormEvent) => void;
  isAnimating: boolean;
  visible: boolean;
  mangaList: any[];
  setVisible: (visible: boolean) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setSelectedManga: (manga: MangaType | null) => void;
}

export interface ContentProps {
  selectedManga: MangaType | null;
  recommendations: any[];
}
