import React, { useEffect, useState } from "react";
import { connect } from "react-redux"
import { makeStyles } from '@mui/styles';
import { IMovies } from "../../types/movieList";
import { Container } from "@mui/material";
import GenreFilter from "../GenreFilter/GenreFilter";
import Loader from "../Loader/Loader";
import { fetchRecomensList, fetchMovieList } from "../../store/action-creators/moviesListActionCreators";
import { AppStatetype } from "../../store/reducers";
import RecommendationMovies from "../RecommendationMovies/RecommendationMovies";

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
              :<RecommendationMovies movies={movies} />
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