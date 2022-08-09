import { Dispatch } from 'react';
import { FavoriteMoviesActionsTypes, FavoriteMoviesActionType } from '../../types/favoriteMovies';
import { ref, set, child, get } from "firebase/database"
import { database } from '../../firebase';


export const getFavoriteMovies = (userId: string) => {
	const thunk = async (dispatch: Dispatch<FavoriteMoviesActionType>) => {
		try {
            dispatch({type: FavoriteMoviesActionsTypes.FETCH_FAVORITE_MOVIES})

            const favoriteRef = ref(database, 'userId/');
            get(child(favoriteRef, userId)).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val()
                    dispatch({
                        type: FavoriteMoviesActionsTypes.UPDATE_FAVORITE_MOVIES,
                        payload: data.favoriteMovies
                    })
                } else {
                    dispatch({
                        type: FavoriteMoviesActionsTypes.UPDATE_FAVORITE_MOVIES,
                        payload: []
                    })
                }
            }).catch((error) => {
                console.error(error);
            });

        } catch (error) {
            dispatch({type: FavoriteMoviesActionsTypes.UPDATE_IS_FAVORITE_MOVIES_ERROR})
			console.error(`Can't proceed fetch favorite movie list, ${error}`)
		}
	}
	return thunk;
}

export const updateFavoriteMovies = (userId: string, newMovies: string[]) => {
	const thunk = async (dispatch: Dispatch<FavoriteMoviesActionType>) => {
		try {
            dispatch({type: FavoriteMoviesActionsTypes.FETCH_FAVORITE_MOVIES})
            
            set(ref(database, `userId/${userId}`), {
                favoriteMovies: newMovies
            }).then(() => {
                dispatch({
                    type: FavoriteMoviesActionsTypes.UPDATE_FAVORITE_MOVIES,
                    payload: newMovies
                })
            })
            
		} catch (error) {
            dispatch({type: FavoriteMoviesActionsTypes.UPDATE_IS_FAVORITE_MOVIES_ERROR})
			console.error(`Can't proceed fetch favorite movie list, ${error}`)
		}
	}
	return thunk;
}

export const clearFavoriteMovies = () => {
    return {
        type: FavoriteMoviesActionsTypes.CLEAR_FAVORITE_MOVIES,
        payload: []
    }
}