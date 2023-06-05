import { Dispatch } from 'redux';
import { ref, set, child, get } from 'firebase/database';
import { FavoriteMoviesActionType } from '../../types/favoriteMovies';
import { database } from '../../firebase';
import { IMovies } from '../../types/movieList';
import { setFavoriteMovies, setFavoriteMoviesError, setLoadingFavoriteMovies } from '../actions/favoriteMoviesAction';

export const getFavoriteMovies = (userId: string) => {
  const thunk = async (dispatch: Dispatch<FavoriteMoviesActionType>) => {
    try {
      dispatch(setLoadingFavoriteMovies());

      const favoriteRef = ref(database, 'userId/');
      get(child(favoriteRef, userId))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            dispatch(setFavoriteMovies(data.favoriteMovies));
          } else {
            dispatch(setFavoriteMovies([]));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      dispatch(setFavoriteMoviesError());
      console.error(`Can't proceed fetch favorite movie list, ${error}`);
    }
  };
  return thunk;
};

export const updateFavoriteMovies = (userId: string, newMovies: IMovies[]) => {
  const thunk = async (dispatch: Dispatch<FavoriteMoviesActionType>) => {
    try {
      dispatch(setLoadingFavoriteMovies());

      set(ref(database, `userId/${userId}`), {
        favoriteMovies: newMovies,
      }).then(() => {
        dispatch(setFavoriteMovies(newMovies));
      });
    } catch (error) {
      dispatch(setFavoriteMoviesError());
      console.error(`Can't proceed fetch favorite movie list, ${error}`);
    }
  };
  return thunk;
};
