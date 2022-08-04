import { Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppStatetype } from '../../store/reducers';
import { setSearchList } from '../../store/action-creators/moviesListActionCreators';
import { IMovies } from '../../types/movieList';
import Loader from '../Loader/Loader';
import RecommendationMovies from '../RecommendationMovies/RecommendationMovies';

type ReactComponent = React.FunctionComponent<{ isLoading: boolean, isError: boolean, searchMovies: IMovies[] } & { setSearchList: (name: string) => Promise<void> }>

const SearchMovies: ReactComponent = ({isLoading, isError, searchMovies, setSearchList}) => {
    const { movieName } = useParams();

    useEffect(() => {
        setSearchList(String(movieName))
    }, [movieName])

    return (
        <Container >
            <Typography variant='h3' component='h2' textAlign='center' margin='.5em 0'>Result search: {movieName}</Typography>
            {
                isLoading
                    ?<Loader />
                    :<RecommendationMovies movies={searchMovies} />
            }
        </Container>
    )
}

const mapStateToProps = (state: AppStatetype) => {
    return {
        isLoading: state.movieList.isLoading,
        isError: state.movieList.isError,
        searchMovies: state.movieList.searchMovies
    }
}

export default connect(mapStateToProps, {setSearchList})(SearchMovies);