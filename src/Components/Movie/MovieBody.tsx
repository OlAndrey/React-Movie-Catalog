import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import YouTube from 'react-youtube';
import { ICurent } from '../../types/movieList';
import { UserType } from '../../types/Auth';

type MovieBodyPropsType = {
  isFavorite: boolean;
  isLoadingUpdata: boolean;
  trailerId: string;
  selectMovie: ICurent;
  user: UserType;
  toggleIsFavorite: () => void;
};

const MovieBody: React.FC<MovieBodyPropsType> = ({
  isFavorite,
  isLoadingUpdata,
  trailerId,
  selectMovie,
  user,
  toggleIsFavorite,
}) => {
  const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const opts = {
    height: '360',
    width: '100%',
    playerVars: {
      autoplay: 0, // 1 or 0 for autoplay on - off
    },
  };

  return (
    <>
      <Typography
        variant="h2"
        sx={{ fontSize: '2.5em', fontWeight: '500', textAlign: 'center', margin: '.35em 0' }}
      >
        {selectMovie.title}
      </Typography>

      <Grid
        container
        columns={{ xs: 4, sm: 12, md: 12 }}
        sx={{ margin: { xs: 0 }, width: { xs: '100%' }, flexWrap: 'wrap-reverse' }}
        justifyContent="space-around"
      >
        <Grid item xs={12} sm={12} md={7} lg={8}>
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: { sm: '0', md: '0 0 0 1.25em' },
          }}
        >
          <Box
            component="img"
            sx={{
              padding: 0,
              height: 'auto',
              width: '100%',
            }}
            alt="The house from the offer."
            src={imgBaseUrl + selectMovie.poster_path}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MovieBody;
