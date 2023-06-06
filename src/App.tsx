import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FavoriteMovies from './Components/FavoriteMovies/FavoriteMovies';
import Header from './Components/Header/Header';
import Loader from './Components/Loader/Loader';
import Movie from './Components/Movie/Movie';
import FourOFour from './Components/Page404/Page404';
import SearchMovies from './Components/SearchMovies/SearchMovies';
import { checkAuthUser } from './store/thunk-creators/authThunkCreators';
import { clearFavoriteMovies } from './store/actions/favoriteMoviesAction';
import { getFavoriteMovies } from './store/thunk-creators/favoriteMoviesThunkCreators';
import { AppStatetype } from './store/reducers';
import { UserType } from './types/Auth';
import RecommendationMovies from './Components/RecommendationMovies/RecommendationMovies';
import Footer from './Components/Footer/Footer';

type MapStatePropsType = { isCheckAuth: boolean; user: UserType };
type MapDispatchPropsType = {
  checkAuthUser: () => void;
  getFavoriteMovies: (userId: string) => void;
  clearFavoriteMovies: () => void;
};

type AppPropsType = MapStatePropsType & MapDispatchPropsType;

const App: React.FC<AppPropsType> = ({
  isCheckAuth,
  user,
  checkAuthUser,
  getFavoriteMovies,
  clearFavoriteMovies,
}) => {
  useEffect(() => {
    if (isCheckAuth) checkAuthUser();
    if (user) {
      getFavoriteMovies(user.uid);
    } else {
      clearFavoriteMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isCheckAuth) return <Loader />;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
        {user && <Route path="/favoriteMovies" element={<FavoriteMovies />} />}
        <Route path="/search/:movieName" element={<SearchMovies />} />
        <Route path="/" element={<RecommendationMovies />} />
        <Route path="/*" element={<FourOFour />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

const mapStateToProps = (state: AppStatetype): MapStatePropsType => {
  return {
    isCheckAuth: state.auth.isCheckAuth,
    user: state.auth.currentUser,
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStatetype>(mapStateToProps, {
  checkAuthUser,
  getFavoriteMovies,
  clearFavoriteMovies,
})(App);
