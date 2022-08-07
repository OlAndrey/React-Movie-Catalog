import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import StarRateIcon from '@mui/icons-material/StarRate';
import YouTube from 'react-youtube';
import { setSelectMovie } from '../../store/action-creators/moviesListActionCreators';
import { AppStatetype } from '../../store/reducers';
import { connect } from 'react-redux';
import { ICurent, IMovies } from '../../types/movieList';
import { genres } from "../../helpers/const";
import Loader from '../Loader/Loader';
import { setTrailerId } from '../../store/action-creators/trailerActionCreators';
import { fetchRecommendationListById } from '../../store/action-creators/recommendationMoviesActionCreator';
import RecommendationMovies from '../RecommendationMovies/RecommendationMovies';
import { useParams } from 'react-router-dom';

type IReact = React.FunctionComponent<
    { isLoading: boolean; trailerId: string, selectMovie: ICurent | null, recommendMovies: IMovies[]} 
    & { setSelectMovie: (id: number) => Promise<void>; setTrailerId: (id: string) => Promise<void>; fetchRecommendationListById: (id: string) => Promise<void>}>

const Movie: IReact = ({ isLoading, selectMovie, trailerId, recommendMovies, setSelectMovie, setTrailerId, fetchRecommendationListById}) => {
    let { id } = useParams();
    const imgBaseUrl: string = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        setSelectMovie(Number(id));
        setTrailerId(String(id))
        fetchRecommendationListById(String(id))
    }, []);

    const opts = {
        height: '360',
        width: '100%',
        playerVars: {
          autoplay: 0, // 1 or 0 for autoplay on - off
        },
    };

    return (
        <Container sx={{ margin: "4.2em auto 0 auto" }}>
        {
          isLoading
          ?<Loader />
            :selectMovie === null
                ?<Typography variant='h2' textAlign="center">No movie found!</Typography>
                :<Grid 
                    container 
                    spacing={{ xs: 2, md: 3 }} 
                    columns={{ xs: 4, sm: 12, md: 12 }} 
                    sx={{border: "2px solid #333", padding: "1em", margin: {xs: 0 }, width: {xs: "100%" }}} 
                    justifyContent="space-around">
                    <Grid item xs={12} sm={12} md={7} lg ={8}>
                        <Typography variant='h2'>
                            {selectMovie.title}
                        </Typography>
                        <Box component="div" sx={{display: { xs: 'block', sm: 'block', md: "none" }}}>
                            {boxContainer(imgBaseUrl + selectMovie.poster_path)}
                        </Box>
                        <Typography variant='body1' sx={{padding: ".75rem 0 .75em 0"}}>
                            <b>About movie: </b>{selectMovie.overview}
                        </Typography>
                        <Typography variant='body1' sx={{padding: "0rem 0 .75em 0"}}>
                            <b>Realese date: </b>&nbsp;&nbsp;&nbsp;&nbsp;
                            {selectMovie.release_date}
                        </Typography>
                        <Typography variant='body1' sx={{padding: "0rem 0 .75em 0"}}>
                            <b>Runtime: </b>&nbsp;&nbsp;&nbsp;&nbsp;
                            {selectMovie.runtime} min.
                        </Typography>
                        <Typography variant='body1'>
                            <b>Genres: </b>&nbsp;&nbsp;&nbsp;&nbsp;
                            {selectMovie.genres.map(genreType => genreType.name).join(",  ")}
                        </Typography>
                        <Typography variant='body1' sx={{padding: ".5rem 0 .75em 0"}}>
                            <b>Vote: </b>&nbsp;&nbsp;&nbsp;&nbsp;
                            <StarRateIcon sx={{marginBottom: '-4px'}} />{selectMovie.vote_average}
                        </Typography>
                        <YouTube videoId={trailerId} opts={opts} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={4} sx={{
                        display: { xs: 'none', sm: 'none', md: "flex" },
                        flexDirection: 'column',
                        justifyContent: 'center'}}>
                            {boxContainer(imgBaseUrl + selectMovie.poster_path)}
                    </Grid>
            
            </Grid>
        }
        <Typography variant='h4' sx={{margin: "1rem 0"}} textAlign="center" >You may like</Typography>
            {recommendMovies.length > 0 ? <RecommendationMovies movies={recommendMovies} /> : <Typography variant='h6' textAlign="center">No recommendations found!</Typography>}
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
      selectMovie: state.movieList.selectMovie,
      trailerId: state.trailer.trailerId,
      recommendMovies: state.recommendList.recommendMovies
    }
}
  
export default connect(mapStateToProps, { setSelectMovie, setTrailerId, fetchRecommendationListById })(Movie);