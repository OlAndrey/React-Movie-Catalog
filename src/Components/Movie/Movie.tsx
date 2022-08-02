import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import StarRateIcon from '@mui/icons-material/StarRate';
import YouTube from 'react-youtube';
import { fetchRecomensList } from '../../store/action-creators/moviesListActionCreators';
import { AppStatetype } from '../../store/reducers';
import { connect } from 'react-redux';
import { genres, IMovies } from '../../types/movieList';
import Loader from '../Loader/Loader';
import { setTrailerId } from '../../store/action-creators/trailerActionCreators';

type IReact = React.FunctionComponent<
    { isLoading: boolean; trailerId: string, movies: IMovies[]} 
    & { fetchRecomensList: () => Promise<void>; setTrailerId: (id: string) => Promise<void>}>

const Movie: IReact = ({ isLoading, movies, trailerId, fetchRecomensList, setTrailerId}) => {
    const imgBaseUrl: string = 'https://image.tmdb.org/t/p/w500';
    const id = 616037;

    useEffect(() => {
        fetchRecomensList();
        setTrailerId(String(id))
    }, []);

    const opts = {
        height: '360',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0, // 1 or 0 for autoplay on - off
        },
    };

    return (
        <Container fixed sx={{margin: "3em auto",}}>
        {
          isLoading
          ?<Loader />
            :<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }} sx={{border: "2px solid #333", padding: "1em"}} justifyContent="space-around">
                <Grid item xs={12} sm={12} md={8} >
                    <Typography variant='h2'>{movies[0].title}</Typography>
                    <Box component="div" sx={{display: { xs: 'block', sm: 'block', md: "none" }}}>
                        {boxContainer(imgBaseUrl + movies[0].posterPath)}
                    </Box>
                    <Typography variant='body1' sx={{padding: ".75rem 0 .75em 0"}}>{movies[0].overview}</Typography>
                    <Typography variant='body1'>
                        Genres: &nbsp;&nbsp;&nbsp;&nbsp;
                        {movies[0].genreIds.map(genreType => genres[genreType] + ", ")}
                    </Typography>
                    <Typography variant='body1' sx={{padding: ".5rem 0 .75em 0"}}>
                        Vote: &nbsp;&nbsp;&nbsp;&nbsp;
                        <StarRateIcon sx={{marginBottom: '-4px'}} />{movies[0].voteAverage}
                    </Typography>
                    <YouTube
                        videoId={trailerId}
                        opts={opts}
                        className="trailer-video"
                        />
                </Grid>
                <Grid item xs={12} sm={12} md={4} sx={{
                    display: { xs: 'none', sm: 'none', md: "flex" },
                    flexDirection: 'column',
                    justifyContent: 'center'}}>
                        {boxContainer(imgBaseUrl + movies[0].posterPath)}
                </Grid>
            </Grid>
        }
        </Container>
        
    )
}

const boxContainer = (imgUrl: string) => {
    return <Box
            component="img"
            sx={{
                padding: 0,
                height: "auto",
                width: "100%",
            }}
            alt="The house from the offer."
            src={imgUrl}
        />
}

const mapStateToProps = ( state: AppStatetype ) => {
    return {
      isLoading: state.movieList.isLoading,
      movies: state.movieList.movies,
      trailerId: state.trailer.trailerId
    }
}
  
export default connect(mapStateToProps, { fetchRecomensList, setTrailerId })(Movie);