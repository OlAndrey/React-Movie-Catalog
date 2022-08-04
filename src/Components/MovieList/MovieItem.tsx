import React from "react";
import { makeStyles } from '@mui/styles';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Box, Link  } from "@mui/material";
import StarRateIcon from '@mui/icons-material/StarRate';
import { IMovies } from "../../types/movieList";
import { genres } from "../../helpers/const";

const useStyles = makeStyles({ 
  card: {
    maxWidth: 550,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  media: {
    height: 196,
    textAlign: "center"
  },
  cardActionArea: {
    height: "100%",
    flexGrow: 1
  },
  cardContent: {
    height: "calc(100% - 196px - 32px)"
  },
  genreType: {
    display: "inline-block",
    backgroundColor: "#6b6b6b",
    color: "white",
    padding: 5,
    borderRadius: 5,
  },
  voteAverage: {
    width: "70px",
    padding: ".5rem 0 .75em 0",
    textAlign: "right"
  }
});

const imgBaseUrl: string = 'https://image.tmdb.org/t/p/w500';

const MovieItem: React.FunctionComponent<IMovies> = (props) => {
  const classes = useStyles();
  return (
      <Card className={classes.card}>
          <Link href={"/movie/" + props.id} variant="body2" sx={{display: 'block', height: "100%", textDecoration: "none", color: "inherit"}}>
            <CardActionArea className={classes.cardActionArea} >
                {
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