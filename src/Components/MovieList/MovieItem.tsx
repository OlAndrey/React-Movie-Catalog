import React, { useEffect, useState } from 'react';
import '../../styles/movieStyle.css';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
  Link,
} from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { connect } from 'react-redux';
import { IMovies } from '../../types/movieList';
import { genres } from '../../helpers/const';
import { useMovieStyles } from './MovieStyle';
import { AppStatetype } from '../../store/reducers';
import { updateFavoriteMovies } from '../../store/action-creators/favoriteMoviesActionCreators';
import { UserType } from '../../types/Auth';

type MapStatePropsType = { isLoading: boolean; favoriteMovies: IMovies[] };
type MapDispatchPropsType = {
  updateFavoriteMovies: (userId: string, newMovies: IMovies[]) => void;
};
type OwnPropsType = { user: UserType; movie: IMovies };

type MovieItemProps = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

const MovieItem: React.FC<MovieItemProps> = ({
  isLoading,
  user,
  movie,
  favoriteMovies,
  updateFavoriteMovies,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const classes = useMovieStyles();

  useEffect(() => {
    if (favoriteMovies.filter((movieItem) => movieItem.id === movie.id).length) setIsFavorite(true);
    else setIsFavorite(false);
  }, [favoriteMovies, movie.id]);

  const toggleIsFavorite = () => {
    if (user) {
      if (isFavorite) {
        const newFavoriteList = favoriteMovies.filter((movieItem) => movieItem.id !== movie.id);
        updateFavoriteMovies(user.uid, newFavoriteList);
      } else {
        const newFavoriteList = [...favoriteMovies, movie];
        updateFavoriteMovies(user.uid, newFavoriteList);
      }
    }
  };

  return (
    <Card
      className={classes.card}
      sx={{
        color: 'rgba(250, 250, 250, 0.87)',
        background: '#000',
        transition: '3s all ease-in-out',
      }}
    >
      <div className="card-container">
        <Link
          href={`/movie/${movie.id}`}
          variant="body2"
          sx={{ display: 'block', height: '100%', textDecoration: 'none', color: 'inherit' }}
        />
      </div>
      {user && (
        <button
          type="button"
          className={isFavorite ? 'favorite' : 'no-favorite'}
          onClick={toggleIsFavorite}
          disabled={isLoading}
        >
          {isFavorite ? (
            <FavoriteIcon sx={{ color: 'red' }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: 'red' }} />
          )}
        </button>
      )}

      <Link
        href={`/movie/${movie.id}`}
        variant="body2"
        sx={{ height: '100%', textDecoration: 'none', color: 'inherit' }}
      >
        <CardActionArea className={classes.cardActionArea}>
          {movie.backdropPath ? (
            <CardMedia
              className={classes.media}
              image={imgBaseUrl + movie.backdropPath}
              title="Poster"
            />
          ) : (
            <Typography variant="h5" className={classes.media}>
              Poster not found
            </Typography>
          )}
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {movie.title}
            </Typography>
            <Typography variant="body2" component="p">
              {movie.overview || 'No overview'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions sx={{ alignItems: 'flex-end' }}>
        <Box sx={{ flexGrow: 1 }}>
          {movie.genreIds.map((genreType) => (
            <Typography key={genreType} className={classes.genreType} mr={2} mb={1}>
              {genres[genreType]}
            </Typography>
          ))}
        </Box>
        <Typography variant="body1" className={classes.voteAverage}>
          <StarRateIcon sx={{ marginBottom: '-4px' }} />
          {movie.voteAverage.toFixed(1)}
        </Typography>
      </CardActions>
    </Card>
  );
};

const MapStateToProps = (state: AppStatetype): MapStatePropsType => {
  return {
    isLoading: state.favoriteMovies.isLoading,
    favoriteMovies: state.favoriteMovies.favoriteMovies,
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStatetype>(
  MapStateToProps,
  { updateFavoriteMovies }
)(MovieItem);
