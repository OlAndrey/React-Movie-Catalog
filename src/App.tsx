import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Loader from './Components/Loader/Loader';
import Movie from './Components/Movie/Movie';
import MovieList from './Components/MovieList/MovieList';
import FourOFour from './Components/Page404/Page404';
import { checkAuthUser } from './store/action-creators/authActionCreators';
import { AppStatetype } from './store/reducers';

const App: React.FunctionComponent<{isCheckAuth: boolean} & {checkAuthUser: () => void}> = ({ isCheckAuth, checkAuthUser }) => {

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
          <Route path="/" element={<MovieList />} />
          <Route path="/*" element={<FourOFour />} />
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = ( state: AppStatetype ) => {
  return {
      isCheckAuth: state.auth.isCheckAuth
  }
}

export default connect(mapStateToProps, { checkAuthUser })(App);