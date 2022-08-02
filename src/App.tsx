import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Header from './Components/Header/Header';
import Loader from './Components/Loader/Loader';
import Movie from './Components/Movie/Movie';
import MovieList from './Components/MovieList/MovieList';
import { checkAuthUser } from './store/action-creators/authActionCreators';
import { AppStatetype } from './store/reducers';

const App: React.FunctionComponent<{isCheckAuth: boolean} & {checkAuthUser: () => void}> = ({ isCheckAuth, checkAuthUser }) => {

  useEffect(() => {
    checkAuthUser()
  }, [])

  if(isCheckAuth)
    return<Loader />


  return (
    <>
      <Header />
      <Movie />
    </>
  );
}

const mapStateToProps = ( state: AppStatetype ) => {
  return {
      isCheckAuth: state.auth.isCheckAuth
  }
}

export default connect(mapStateToProps, { checkAuthUser })(App);