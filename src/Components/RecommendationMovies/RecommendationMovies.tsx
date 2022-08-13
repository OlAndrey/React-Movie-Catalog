import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import { IMovies } from '../../types/movieList';
import GenreFilter from '../GenreFilter/GenreFilter';
import Loader from '../Loader/Loader';
import {
  fetchRecomensList,
  fetchMovieList,
  updateRecomensList,
} from '../../store/action-creators/moviesListActionCreators';
import { AppStatetype } from '../../store/reducers';
import MovieList from '../MovieList/MovieList';

type MapStatePropsType = {
  isLoading: boolean;
  isLoadingUpdate: boolean;
  currentPage: number;
  totalPages: number;
  byGenreTypeId: string;
  movies: IMovies[];
};

type MapDispatchPropsType = {
  fetchRecomensList: () => void;
  fetchMovieList: (id: number, page: number) => void;
  updateRecomensList: (page: number) => void;
};

type RecommendationMoviesPropsType = MapStatePropsType & MapDispatchPropsType;

const useStyles = makeStyles({
  grid: {
    width: '100%',
    flexGrow: 1,
    marginBottom: '40px',
  },
});

const RecommendationMovies: React.FC<RecommendationMoviesPropsType> = ({
  isLoading,
  isLoadingUpdate,
  movies,
  currentPage,
  totalPages,
  byGenreTypeId,
  fetchMovieList,
  fetchRecomensList,
  updateRecomensList,
}) => {
  const [selectGenre, setSelectGenre] = useState<number>(0);
  const moviesMemo = useMemo(() => movies, [movies]);
  const classes = useStyles();

  useEffect(() => {
    fetchRecomensList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollHandler = () => {
    const containerHeight = document.documentElement.clientHeight;
    const { scrollHeight } = document.documentElement;

    const { scrollTop } = document.documentElement;
    const currentPosition = ((scrollTop + containerHeight) / scrollHeight) * 100;
    if (!(currentPosition < 99) && currentPage !== totalPages && !isLoadingUpdate) {
      if (+byGenreTypeId > 0) fetchMovieList(+byGenreTypeId, currentPage + 1);
      else updateRecomensList(currentPage + 1);
    }
  };

  useEffect(() => {
    if (currentPage) document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isLoadingUpdate]);

  const handleFilterChange = (filter: string) => {
    const genreId = Number(filter);
    if (selectGenre !== genreId) {
      setSelectGenre(genreId);
      if (genreId === 0) fetchRecomensList();
      else fetchMovieList(genreId, 1);
    }
  };

  return (
    <Container fixed className={classes.grid}>
      <GenreFilter changeFilter={handleFilterChange} />
      {isLoading ? <Loader /> : <MovieList movies={moviesMemo} />}
    </Container>
  );
};

const mapStateToProps = (state: AppStatetype): MapStatePropsType => {
  return {
    isLoading: state.movieList.isLoading,
    isLoadingUpdate: state.movieList.isLoadingUpdate,
    currentPage: state.movieList.currentPage,
    totalPages: state.movieList.totalPages,
    movies: state.movieList.movies,
    byGenreTypeId: state.movieList.byGenreTypeId,
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStatetype>(mapStateToProps, {
  fetchRecomensList,
  fetchMovieList,
  updateRecomensList,
})(RecommendationMovies);
