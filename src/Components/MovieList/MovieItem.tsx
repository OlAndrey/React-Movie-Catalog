import React, { useState } from "react";
import "../../styles/movieStyle.css";
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Box, Link  } from "@mui/material";
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IMovies } from "../../types/movieList";
import { genres } from "../../helpers/const";
import { useMovieStyles } from "./MovieStyle"

const imgBaseUrl: string = 'https://image.tmdb.org/t/p/w500';

const MovieItem: React.FC<IMovies> = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const classes = useMovieStyles();

    return (
        <Card className={classes.card} sx={{ transition: "3s all ease-in-out"}}>
            <div className="card-container">
                <Link href={"/movie/" + props.id} variant="body2" sx={{display: 'block', height: "100%", textDecoration: "none", color: "inherit"}}></Link>
            </div>
            <div className={isFavorite ? "favorite" : "no-favorite"} onClick={() => setIsFavorite(!isFavorite)}>
                {
                    isFavorite
                        ?<FavoriteIcon sx={{color: 'red', }} />
                        :<FavoriteBorderIcon sx={{color: 'red', }} />
                }
                
            </div>
      
            <Link href={"/movie/" + props.id} variant="body2" sx={{ height: "100%", textDecoration: "none", color: "inherit"}}>
                <CardActionArea className={classes.cardActionArea} >{
                        props.backdropPath
                        ?<CardMedia
                            className={classes.media}
                            image={imgBaseUrl + props.backdropPath}
                            title="Poster"
                            />
                        :<Typography variant="h5" className={classes.media}>Poster not found</Typography>
                    }
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {props.overview || "No overview"}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions sx={{ alignItems: "flex-end"}}>
          
                <Box sx={{flexGrow: 1 }}>
                    {
                        props.genreIds.map(genreType => (
                            <Typography key={genreType} className={classes.genreType} mr={2} mb={1}>{genres[genreType]}</Typography>
                        ))
                    }
                </Box>
                <Typography variant='body1' className={classes.voteAverage}>
                    <StarRateIcon sx={{marginBottom: '-4px'}} />{props.voteAverage.toFixed(1)}
                </Typography>
            </CardActions>
        </Card>
    );
};

export default MovieItem;