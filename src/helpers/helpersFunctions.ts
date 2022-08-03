import { ICurent, IMovies, IPopular } from "../types/movieList";

export const filterMovies = (data: IPopular[]): IMovies[] => {
    const result: IMovies[] = [];
    data.map(movie => (
      result.push({
        backdropPath: movie.backdrop_path,
        posterPath: movie.poster_path,
        id: movie.id,
        genreIds: movie.genre_ids.slice(0, 3),
        title: movie.title,
        voteAverage: movie.vote_average,
        overview: movie.overview
      })
    ));
  
    return result;
};

export const filterMovie = (data: ICurent): ICurent => ({
    backdrop_path: data.backdrop_path,
    genres: data.genres,
    homepage: data.homepage,
    id: data.id,
    overview: data.overview,
    poster_path: data.poster_path,
    release_date: data.release_date,
    runtime: data.runtime,
    tagline: data.tagline,
    title: data.title,
    vote_average: data.vote_average,
});