import React, { useEffect, useState } from "react";
import { connect } from "react-redux"
import { makeStyles } from '@mui/styles';
import { IMovies } from "../../types/movieList";
import { Container, Grid } from "@mui/material";
import MovieItem from "./MovieItem";
import GenreFilter from "../GenreFilter/GenreFilter";
import Loader from "../Loader/Loader";
import { fetchRecomensList, fetchMovieList } from "../../store/action-creators/moviesListActionCreators";
import { AppStatetype } from "../../store/reducers";

type IReact = React.FunctionComponent<{ isLoading: boolean; movies: IMovies[]} & { fetchRecomensList: () => Promise<void>; fetchMovieList: (id: number) => Promise<void>; }>

const useStyles = makeStyles({ 
  grid: {
    flexGrow: 1,
    height: "1px",
    minHeight: "100%",
    marginBottom: "40px",
  }
})
  
const MovieList: IReact = ({isLoading, movies, fetchMovieList, fetchRecomensList}) => {
    const [selectGenre, setSelectGenre] = useState<number>(0)
    const classes = useStyles();  
  
    const handleFilterChange = (filter: string) => {
      const genreId = Number(filter);
      if(selectGenre !== genreId){
        setSelectGenre(genreId)
        if(genreId === 0)
          fetchRecomensList()
        else
          fetchMovieList(genreId)
      }
    }

    useEffect(() => {
      fetchRecomensList()
    }, []);

    return (
        <Container className={classes.grid}>
            <GenreFilter changeFilter={handleFilterChange} />
            {
              isLoading
              ?<Loader />
              :<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-around">
                {
                  movies.map((movie) => (
                        <Grid item xs={12} sm={4} md={4} key={movie.id}>
                          <MovieItem {...movie} />
                        </Grid>
                    ))
                }
                </Grid>
            }
        </Container>
    )
}

const mapStateToProps = ( state: AppStatetype ) => {
  return {
    isLoading: state.movieList.isLoading,
    movies: state.movieList.movies
  }
}

export default connect(mapStateToProps, { fetchRecomensList, fetchMovieList })(MovieList);