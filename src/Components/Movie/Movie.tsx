import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, Container } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import YouTube from 'react-youtube';
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
  isLoadingUpdata,
  selectMovie,
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
  const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

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

  const opts = {
    height: '360',
    width: '100%',
    playerVars: {
      autoplay: 0, // 1 or 0 for autoplay on - off
    },
  };

  const boxContainer = (imgUrl: string) => {
    return (
      <Box
        component="img"
        sx={{
          padding: 0,
          height: 'auto',
          width: '100%',
        }}
        alt="The house from the offer."
        src={imgUrl}
      />
    );
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
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 12, md: 12 }}
          sx={{ margin: { xs: 0 }, width: { xs: '100%' } }}
          justifyContent="space-around"
        >
          <Grid item xs={12} sm={12} md={7} lg={8}>
            <Typography variant="h2" sx={{ fontSize: '2.5em', fontWeight: '500' }}>
              {selectMovie.title}
            </Typography>
            <Box component="div" sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
              {boxContainer(imgBaseUrl + selectMovie.poster_path)}
            </Box>
            <Typography variant="body1" sx={{ padding: '.75rem 0 .75em 0' }}>
              <b>About movie: </b>
              {selectMovie.overview}
            </Typography>
            <Typography variant="body1" sx={{ padding: '0rem 0 .75em 0' }}>
              <b>Realese date: </b>&nbsp;&nbsp;&nbsp;&nbsp;
              {selectMovie.release_date}
            </Typography>
            <Typography variant="body1" sx={{ padding: '0rem 0 .75em 0' }}>
              <b>Runtime: </b>&nbsp;&nbsp;&nbsp;&nbsp;
              {selectMovie.runtime} min.
            </Typography>
            <Typography variant="body1">
              <b>Genres: </b>&nbsp;&nbsp;&nbsp;&nbsp;
              {selectMovie.genres.map((genreType) => genreType.name).join(',  ')}
            </Typography>
            <Typography variant="body1" sx={{ padding: '.5rem 0 .75em 0' }}>
              <b>Vote: </b>&nbsp;&nbsp;&nbsp;&nbsp;
              <StarRateIcon sx={{ marginBottom: '-4px' }} />
              {selectMovie.vote_average}
            </Typography>
            {user && (
              <Box sx={{ width: '11em', margin: ' 0 auto 0.75em auto' }}>
                <Button
                  variant="outlined"
                  color={isFavorite ? 'error' : 'warning'}
                  disabled={isLoadingUpdata}
                  onClick={toggleIsFavorite}
                >
                  {isFavorite ? (
                    <>
                      <FavoriteIcon sx={{ color: 'red' }} />
                      &nbsp;&nbsp;Favorite
                    </>
                  ) : (
                    <>
                      <FavoriteBorderIcon sx={{ color: 'red' }} />
                      &nbsp;&nbsp;Add Favorite
                    </>
                  )}
                </Button>
              </Box>
            )}

            <YouTube videoId={trailerId} opts={opts} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={4}
            sx={{
              display: { xs: 'none', sm: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {boxContainer(imgBaseUrl + selectMovie.poster_path)}
          </Grid>
        </Grid>
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
