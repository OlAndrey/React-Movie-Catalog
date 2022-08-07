import { Grid } from "@mui/material";
import React from "react";
import { IMovies } from "../../types/movieList";
import MovieItem from "../MovieList/MovieItem";

type RecommendationMoviesPropsType = { movies : IMovies[] }

const RecommendationMovies: React.FC<RecommendationMoviesPropsType> = ({ movies }) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-around">
            {
                movies.map((movie) => (
                    <Grid item xs={12} sm={4} md={4} key={movie.id}>
                        <MovieItem {...movie} />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default RecommendationMovies;