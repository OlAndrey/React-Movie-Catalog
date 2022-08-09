import axios from "axios"

const apiKey: String = 'b35f53caccfa4398c708083960012136';

export const fetchRecomends = (page: number = 1) => {
    return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)
}

export const fetchSelectMovieDetails = (id: number) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
}

export const fetchMoviesWithGenre = (genreId: number, page: number) => {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&vote_average.gte=6&with_genres=${genreId}&page=${page}`)
}

export const fetchSearchMovies= (query: string) => {
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&include_adult=false`)
}