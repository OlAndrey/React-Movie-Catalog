import React, { useEffect, useState } from "react";
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { IMovies, IPopular } from "../../types/movieList";
import { Container, Grid } from "@mui/material";
import MovieItem from "./MovieItem";
import GenreFilter from "../GenreFilter/GenreFilter";
import { error } from "console";

const useStyles = makeStyles({ 
  grid: {
    margin: "80px 0",
  }
})

const filterMovies = (data: IPopular[]): IMovies[] => {
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
  
const MovieList = () => {
    const apiKey: String = 'b35f53caccfa4398c708083960012136';
    const classes = useStyles();
    const [movies, setMovies] = useState<Array<IMovies>>([]);
  
    const handleFilterChange = (filter: string) => {
      const genreId = Number(filter);
      if(genreId === 0)
        fetchRecomends()
      else
        axios
          .get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&vote_average.gte=6&with_genres=${genreId}`)
          .then((res) => {
            setMovies(filterMovies(res.data.results))
          }).catch(error => console.error(error))
    }

    const fetchRecomends = () => {
      axios
        .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`)
        .then((res) => {
          setMovies(filterMovies(res.data.results))
        }).catch(error => console.error(error))
    }

    useEffect(() => {
      fetchRecomends()
    }, []);

    return (
        <Container fixed className={classes.grid}>
            <GenreFilter changeFilter={handleFilterChange} />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-around">

            {
              movies.map((movie) => (
                    <Grid item xs={12} sm={4} md={4} key={movie.id}>
                      <MovieItem {...movie} />
                    </Grid>
                ))
            }
            </Grid>
        </Container>
    )
}

export default MovieList;