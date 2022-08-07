import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux"
import { makeStyles } from '@mui/styles';
import { IMovies } from "../../types/movieList";
import { Container } from "@mui/material";
import GenreFilter from "../GenreFilter/GenreFilter";
import Loader from "../Loader/Loader";
import { fetchRecomensList, fetchMovieList, updateRecomensList } from "../../store/action-creators/moviesListActionCreators";
import { AppStatetype } from "../../store/reducers";
import RecommendationMovies from "../RecommendationMovies/RecommendationMovies";

type IReact = React.FunctionComponent<
    { isLoading: boolean; isLoadingUpdate: boolean; currentPage: number; totalPages: number; movies: IMovies[]} 
    & { fetchRecomensList: () => Promise<void>; fetchMovieList: (id: number) => Promise<void>; updateRecomensList: (page: number) => Promise<void>; }>

const useStyles = makeStyles({ 
  grid: {
    position: "absolute",
    left: 0,
    background: "#fff",
    width: "100%",
    flexGrow: 1,
    height: "1px",
    minHeight: "100%",
    marginBottom: "40px",
    overflow: "auto",
  }
})
  
const MovieList: IReact = ({isLoading, isLoadingUpdate, movies, currentPage, totalPages, fetchMovieList, fetchRecomensList, updateRecomensList}) => {
    const [selectGenre, setSelectGenre] = useState<number>(0)
    const movies1 = useMemo(() => movies, [movies]);
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

    const scrollHandler = (event: React.UIEvent<HTMLDivElement> ) => {
      const containerHeight = event.currentTarget.clientHeight;
      const scrollHeight = event.currentTarget.scrollHeight;
  
      const scrollTop = event.currentTarget.scrollTop;
      const currentPosition = ((scrollTop + containerHeight) / scrollHeight) * 100;
      if(!(currentPosition < 99) && currentPage !== totalPages && !isLoadingUpdate){
        updateRecomensList(currentPage + 1)
      }
    }

    useEffect(() => {
      fetchRecomensList()
    }, []);

    return (
      <div className={classes.grid} onScroll={scrollHandler}>
        <Container>
            <GenreFilter changeFilter={handleFilterChange} />
            {
              isLoading
              ?<Loader />
              :<RecommendationMovies movies={movies1} />
            }
        </Container>
      </div>
    )
}

const mapStateToProps = ( state: AppStatetype ) => {
  return {
    isLoading: state.movieList.isLoading,
    isLoadingUpdate: state.movieList.isLoadingUpdate,
    currentPage: state.movieList.currentPage,
    totalPages: state.movieList.totalPages,
    movies: state.movieList.movies
  }
}

export default connect(mapStateToProps, { fetchRecomensList, fetchMovieList, updateRecomensList })(MovieList);