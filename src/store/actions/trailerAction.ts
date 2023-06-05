import { ITrailerSearch, TrailerActionsTypes, TrailerType } from '../../types/trailer';

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

export const setTrailer = (trailerData: ITrailerSearch[]): TrailerType => ({
  type: TrailerActionsTypes.SET_TRAILER,
  trailerId: trailerSearch(trailerData)
});
