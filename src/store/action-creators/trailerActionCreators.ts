import { Dispatch } from 'redux';
import { ITrailerSearch, TrailerActionsTypes, TrailerType } from '../../types/trailer';
import { fetchTrailerId } from '../API/fetchTrailerId';

const trailerSearch = (data: ITrailerSearch[]) => {
  if (data.length === 0) {
    return 'None trayler';
  }
  const arr = data.filter((i) => i.name === 'Official Trailer');
  if (arr.length > 0) {
    return arr[0].key;
  }
  return data[0].key;
};

export const setTrailerId = (movieId: string) => {
  const thunk = async (dispatch: Dispatch<TrailerType>) => {
    try {
      const dataFromServer = await fetchTrailerId(movieId);

      dispatch({
        type: TrailerActionsTypes.SET_TRAILER,
        trailerId: trailerSearch(dataFromServer.data.results),
      });
    } catch (error) {
      console.error(`Can't proceed fetch trailer id, ${error}`);
    }
  };

  return thunk;
};
