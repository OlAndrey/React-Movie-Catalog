import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Loader from './Components/Loader/Loader';
import Movie from './Components/Movie/Movie';
import MovieList from './Components/MovieList/MovieList';
import FourOFour from './Components/Page404/Page404';
import SearchMovies from './Components/SearchMovies/SearchMovies';
import { checkAuthUser } from './store/action-creators/authActionCreators';
import { AppStatetype } from './store/reducers';

type MapStatePropsType = {isCheckAuth: boolean}
type MapDispatchPropsType = {checkAuthUser: () => void}
type AppPropsType = MapStatePropsType & MapDispatchPropsType

const App: React.FC<AppPropsType> = ({ isCheckAuth, checkAuthUser }) => {
  useEffect(() => {
    checkAuthUser()
  }, [])

  if(isCheckAuth)
    return<Loader />

  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/search/:movieName" element={<SearchMovies />} />
          <Route path="/" element={<MovieList />} />
          <Route path="/*" element={<FourOFour />} />
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = ( state: AppStatetype ): MapStatePropsType => {
  return {
      isCheckAuth: state.auth.isCheckAuth
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStatetype>(
  mapStateToProps, { checkAuthUser }
)(App);