import React from "react";
import { Grid } from "@mui/material";
import { connect } from "react-redux";
import { AppStatetype } from "../../store/reducers";
import { UserType } from "../../types/Auth";
import { IMovies } from "../../types/movieList";
import MovieItem from "./MovieItem";

type MapStatePropsType = { user: UserType}
type OwnPropsType = { movies : IMovies[] }
type MovieListPropsType = MapStatePropsType & OwnPropsType

const MovieList: React.FC<MovieListPropsType> = ({ movies, user }) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-around">
            {
                movies.map((movie) => (
                    <Grid item xs={12} sm={4} md={4} key={movie.id}>
                        <MovieItem movie={movie} user={user} />
                    </Grid>
                ))
            }
        </Grid>
    )
}

const MapStateToProps = (state: AppStatetype): MapStatePropsType => {
    return {
        user: state.auth.currentUser
    }
}

export default connect<MapStatePropsType, {}, OwnPropsType, AppStatetype>(
    MapStateToProps, {}
)(MovieList);