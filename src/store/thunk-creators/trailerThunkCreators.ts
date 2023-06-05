import { Dispatch } from 'redux';
import { TrailerType } from '../../types/trailer';
import { fetchTrailerId } from '../API/fetchTrailerId';
import { setTrailer } from '../actions/trailerAction';

export const setTrailerId = (movieId: string) => {
  const thunk = async (dispatch: Dispatch<TrailerType>) => {
    try {
      const dataFromServer = await fetchTrailerId(movieId);
      dispatch(setTrailer(dataFromServer.data.results));
    } catch (error) {
      console.error(`Can't proceed fetch trailer id, ${error}`);
    }
  };

  return thunk;
};
