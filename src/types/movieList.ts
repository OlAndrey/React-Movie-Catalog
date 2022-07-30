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
    'Adventure' = 12,
    'Fantasy' = 14,
    'Animation' = 16,
    'Drama' = 18,
    'Horror' = 27,
    'Action' = 28,
    'Comedy' = 35,
    'History',
    'Western',
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