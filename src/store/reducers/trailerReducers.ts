import { TrailerActionsTypes, TrailerType } from '../../types/trailer';

type ITrailerId = { trailerId: string };

const initState: ITrailerId = {
  trailerId: '',
};

export const trailerReducers = (state: ITrailerId = initState, action: TrailerType): ITrailerId => {
  switch (action.type) {
    case TrailerActionsTypes.SET_TRAILER:
      return {
        trailerId: action.trailerId,
      };

    default:
      return state;
  }
};
