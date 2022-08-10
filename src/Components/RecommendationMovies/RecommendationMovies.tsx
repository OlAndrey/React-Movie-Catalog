import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux"
import { makeStyles } from '@mui/styles';
import { IMovies } from "../../types/movieList";
import { Container } from "@mui/material";
import GenreFilter from "../GenreFilter/GenreFilter";
import Loader from "../Loader/Loader";
import { fetchRecomensList, fetchMovieList, updateRecomensList } from "../../store/action-creators/moviesListActionCreators";
import { AppStatetype } from "../../store/reducers";
import MovieList from '../MovieList/MovieList';

type MapStatePropsType = { 
  isLoading: boolean 
  isLoadingUpdate: boolean 
  currentPage: number 
  totalPages: number 
  byGenreTypeId: string
  movies: IMovies[]
} 

type MapDispatchPropsType = { 
  fetchRecomensList: () => void 
  fetchMovieList: (id: number, page: number) => void 
  updateRecomensList: (page: number) => void 
}

type RecommendationMoviesPropsType = MapStatePropsType & MapDispatchPropsType 

const useStyles = makeStyles({ 
  grid: {
    position: "absolute",
    left: 0,
    width: "100%",
    flexGrow: 1,
    height: "1px",
    minHeight: "100%",
    marginBottom: "40px",
    overflow: "auto",
  }
})
  
const RecommendationMovies: React.FC<RecommendationMoviesPropsType> = ({isLoading, isLoadingUpdate, movies, currentPage,
                                                                        totalPages, byGenreTypeId, fetchMovieList,
                                                                        fetchRecomensList, updateRecomensList}) => {
    const [selectGenre, setSelectGenre] = useState<number>(0)
    const moviesMemo = useMemo(() => movies, [movies]);
    const classes = useStyles();  
  
    const handleFilterChange = (filter: string) => {
      const genreId = Number(filter);
      if(selectGenre !== genreId){
        setSelectGenre(genreId)
        if(genreId === 0)
          fetchRecomensList()
        else
          fetchMovieList(genreId, 1)
      }
    }

    const scrollHandler = (event: React.UIEvent<HTMLDivElement> ) => {
      const containerHeight = event.currentTarget.clientHeight;
      const scrollHeight = event.currentTarget.scrollHeight;
  
      const scrollTop = event.currentTarget.scrollTop;
      const currentPosition = ((scrollTop + containerHeight) / scrollHeight) * 100;
      if(!(currentPosition < 99) && currentPage !== totalPages && !isLoadingUpdate){
        if(+byGenreTypeId > 0)
          fetchMovieList(+byGenreTypeId, currentPage + 1)
        else
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
                :<MovieList movies={moviesMemo} />
            }
        </Container>
      </div>
    )
}

const mapStateToProps = ( state: AppStatetype ): MapStatePropsType => {
  return {
    isLoading: state.movieList.isLoading,
    isLoadingUpdate: state.movieList.isLoadingUpdate,
    currentPage: state.movieList.currentPage,
    totalPages: state.movieList.totalPages,
    movies: state.movieList.movies,
    byGenreTypeId: state.movieList.byGenreTypeId
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStatetype>(
  mapStateToProps, 
  { fetchRecomensList, fetchMovieList, updateRecomensList }
)(RecommendationMovies);