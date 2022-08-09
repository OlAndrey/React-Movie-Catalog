import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { AppStatetype } from '../../store/reducers';
import Loader from '../Loader/Loader';
import MovieList from '../MovieList/MovieList';
import { IMovies } from '../../types/movieList';

type MapStatePropsType = { 
    isLoading: boolean
    isError: boolean
    favoriteMoviesId: IMovies[]
}

const FavoriteMovies: React.FC<MapStatePropsType> = ({isLoading, isError, favoriteMoviesId}) => {


    return (
        <Container sx={{ margin: "4.2em auto 0 auto" }} >
            <Typography variant='h3' component='h2' textAlign='center' margin='.5em 0'>Favorite Movies</Typography>
            {
                isLoading
                    ?<Loader />
                    :<MovieList movies={favoriteMoviesId} />
            }
        </Container>
    )
}

const mapStateToProps = (state: AppStatetype): MapStatePropsType => {
    return {
        isLoading: state.favoriteMovies.isLoading,
        isError: state.favoriteMovies.isError,
        favoriteMoviesId: state.favoriteMovies.favoriteMovies
    }
}

export default connect<MapStatePropsType, {}, {}, AppStatetype>(
    mapStateToProps, {}
)(FavoriteMovies);