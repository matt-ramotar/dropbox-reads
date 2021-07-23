export interface GoogleBook {
  id: string;
  volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
  authors: string[];
  averageRating: number;
  categories: string[];
  description: string;
  imageLinks: ImageLinks;
  publishedDate: string;
  publisher: string;
  subtitle: string;
  title: string;
}

export interface ImageLinks {
  [key: string]: string;
}
