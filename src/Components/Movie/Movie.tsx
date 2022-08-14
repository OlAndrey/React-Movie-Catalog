import React, { useEffect, useState } from 'react';
import { Typography, Container } from '@mui/material';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectMovie } from '../../store/action-creators/moviesListActionCreators';
import { AppStatetype } from '../../store/reducers';
import { ICurent, IMovies } from '../../types/movieList';
import Loader from '../Loader/Loader';
import { setTrailerId } from '../../store/action-creators/trailerActionCreators';
import { fetchRecommendationListById } from '../../store/action-creators/recommendationMoviesActionCreator';
import MovieList from '../MovieList/MovieList';
import { updateFavoriteMovies } from '../../store/action-creators/favoriteMoviesActionCreators';
import { UserType } from '../../types/Auth';
import { currentMovieToMovies } from '../../helpers/helpersFunctions';
import MovieBody from './MovieBody';

type MapStatePropsType = {
  isLoading: boolean;
  isLoadingUpdata: boolean;
  trailerId: string;
  selectMovie: ICurent | null;
  user: UserType;
  recommendMovies: IMovies[];
  favoriteMovies: IMovies[];
};

type MapDispatchPropsType = {
  setSelectMovie: (id: number) => void;
  setTrailerId: (id: string) => void;
  fetchRecommendationListById: (id: string) => void;
  updateFavoriteMovies: (userId: string, newMovies: IMovies[]) => void;
};

type MoviePropsType = MapStatePropsType & MapDispatchPropsType;

const Movie: React.FC<MoviePropsType> = ({
  isLoading,
  selectMovie,
  isLoadingUpdata,
  trailerId,
  user,
  recommendMovies,
  favoriteMovies,
  updateFavoriteMovies,
  setSelectMovie,
  setTrailerId,
  fetchRecommendationListById,
}) => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setSelectMovie(Number(id));
    setTrailerId(String(id));
    fetchRecommendationListById(String(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectMovie) {
      if (favoriteMovies.filter((movieItem) => movieItem.id === selectMovie.id).length)
        setIsFavorite(true);
      else setIsFavorite(false);
    }
  }, [favoriteMovies, selectMovie]);

  const toggleIsFavorite = () => {
    if (user && selectMovie) {
      if (isFavorite) {
        const newFavoriteList = favoriteMovies.filter(
          (movieItem) => movieItem.id !== selectMovie.id
        );
        updateFavoriteMovies(user.uid, newFavoriteList);
      } else {
        const movie = currentMovieToMovies(selectMovie);
        const newFavoriteList = [...favoriteMovies, movie];
        updateFavoriteMovies(user.uid, newFavoriteList);
      }
    }
  };

  return (
    <Container sx={{ margin: '4.2em auto 0 auto', flexGrow: 1 }}>
      {isLoading ? (
        <Loader />
      ) : selectMovie === null ? (
        <Typography variant="h2" textAlign="center">
          No movie found!
        </Typography>
      ) : (
        <MovieBody
          isFavorite={isFavorite}
          isLoadingUpdata={isLoadingUpdata}
          trailerId={trailerId}
          selectMovie={selectMovie}
          user={user}
          toggleIsFavorite={toggleIsFavorite}
        />
      )}

      <Typography variant="h4" sx={{ margin: '1rem 0' }} textAlign="center">
        You may like
      </Typography>

      {recommendMovies.length > 0 ? (
        <MovieList movies={recommendMovies} />
      ) : (
        <Typography variant="h6" textAlign="center">
          No recommendations found!
        </Typography>
      )}
    </Container>
  );
};

const mapStateToProps = (state: AppStatetype): MapStatePropsType => {
  return {
    isLoading: state.movieList.isLoading,
    isLoadingUpdata: state.favoriteMovies.isLoading,
    selectMovie: state.movieList.selectMovie,
    trailerId: state.trailer.trailerId,
    user: state.auth.currentUser,
    recommendMovies: state.recommendList.recommendMovies,
    favoriteMovies: state.favoriteMovies.favoriteMovies,
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStatetype>(mapStateToProps, {
  setSelectMovie,
  setTrailerId,
  fetchRecommendationListById,
  updateFavoriteMovies,
})(Movie);
