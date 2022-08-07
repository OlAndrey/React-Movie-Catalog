import { makeStyles } from '@mui/styles';

export const useMovieStyles = makeStyles({ 
    card: {
      maxWidth: 550,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      position: "relative",
      "&:hover": {
          "& .no-favorite, & .favorite": {
              top: 0,
              right: 0,
          },
          "& .card-container": {
              top: 0,
              right: 0,
          }
      }
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