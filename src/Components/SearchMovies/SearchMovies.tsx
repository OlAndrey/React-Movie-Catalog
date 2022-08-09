import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppStatetype } from '../../store/reducers';
import { setSearchList } from '../../store/action-creators/moviesListActionCreators';
import { IMovies } from '../../types/movieList';
import Loader from '../Loader/Loader';
import MovieList from '../MovieList/MovieList';

type MapStatePropsType = { 
    isLoading: boolean
    isError: boolean
    searchMovies: IMovies[]
}

type MapDispatchPropsType = { setSearchList: (name: string) => void }
type SearchMoviesPropsType = MapStatePropsType & MapDispatchPropsType

const SearchMovies: React.FC<SearchMoviesPropsType> = ({isLoading, isError, searchMovies, setSearchList}) => {
    const { movieName } = useParams();

    useEffect(() => {
        setSearchList(String(movieName))
    }, [movieName])

    return (
        <Container sx={{ margin: "4.2em auto 0 auto" }} >
            <Typography variant='h3' component='h2' textAlign='center' margin='.5em 0'>Result search: {movieName}</Typography>
            {
                isLoading
                    ?<Loader />
                    :<MovieList movies={searchMovies} />
            }
        </Container>
    )
}

const mapStateToProps = (state: AppStatetype): MapStatePropsType => {
    return {
        isLoading: state.movieList.isLoading,
        isError: state.movieList.isError,
        searchMovies: state.movieList.searchMovies
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStatetype>(
    mapStateToProps, {setSearchList}
)(SearchMovies);