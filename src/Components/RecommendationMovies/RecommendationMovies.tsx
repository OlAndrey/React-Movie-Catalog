import React from "react";
import { Grid } from "@mui/material";
import { connect } from "react-redux";
import { AppStatetype } from "../../store/reducers";
import { UserType } from "../../types/Auth";
import { IMovies } from "../../types/movieList";
import MovieItem from "../MovieList/MovieItem";

type MapStatePropsType = { user: UserType}
type OwnPropsType = { movies : IMovies[] }
type RecommendationMoviesPropsType = MapStatePropsType & OwnPropsType

const RecommendationMovies: React.FC<RecommendationMoviesPropsType> = ({ movies, user }) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-around">
            {
                movies.map((movie) => (
                    <Grid item xs={12} sm={4} md={4} key={movie.id}>
                        <MovieItem {...movie} user={user} />
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

export default  connect<MapStatePropsType, {}, OwnPropsType, AppStatetype>(
    MapStateToProps, {}
)(RecommendationMovies);