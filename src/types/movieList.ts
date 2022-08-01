export interface IPopular {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
  
export interface IMovies {
    backdropPath: string,
    posterPath: string,
    id: number,
    genreIds: number[],
    title: string,
    voteAverage: number,
    overview: string
}

export enum genres {
    'All' = 0,
    'Adventure' = 12,
    'Fantasy' = 14,
    'Animation' = 16,
    'Drama' = 18,
    'Horror' = 27,
    'Action' = 28,
    'Comedy' = 35,
    'History' = 36,
    'Western' = 37,
    'Thriller' = 53,
    'Crime' = 80,
    'Documentary' = 99,
    'Science Fiction' = 878,
    'Mystery' = 9648,
    'Music' = 10402,
    'Romance' = 10749,
    'War' = 10752,
    'Family' = 10751,
    'TV Movie' = 10770,
};

export const genreList: { genre: string, id: string | number }[] = [
    {genre: 'All', id: 0},
    {genre: 'Adventure', id: 12},
    {genre: 'Fantasy', id: 14,},
    {genre: 'Animation', id: 16},
    {genre: 'Drama', id: 18},
    {genre: 'Horror', id: 27},
    {genre: 'Action', id: 28},
    {genre: 'Comedy', id: 35},
    {genre: 'History', id: 36},
    {genre: 'Western', id: 37},
    {genre: 'Thriller', id: 53},
    {genre: 'Crime', id: 80},
    {genre: 'Documentary', id: 99},
    {genre: 'Science Fiction', id: 878},
    {genre: 'Mystery', id: 9648},
    {genre: 'Music', id: 10402},
    {genre: 'Romance', id: 10749},
    {genre: 'War', id: 10752},
    {genre: 'Family', id: 10751},
    {genre: 'TV Movie', id: 10770},
];
