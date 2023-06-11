import { setTrailer } from '../../store/actions/trailerAction';
import { trailerReducers } from '../../store/reducers/trailerReducers';
import { ITrailerSearch } from '../../types/trailer';

const trailerList: ITrailerSearch[] = [
  {
    iso_639_1: 'en',
    iso_3166_1: 'US',
    name: 'Special Feature - Rina’s Range',
    key: 'vBwj0QpKbSM',
    site: 'YouTube',
    size: 1080,
    type: 'Featurette',
    official: true,
    published_at: '2023-03-24T21:08:20.000Z',
    id: '642231e623be4600febeb864',
  },
  {
    iso_639_1: 'en',
    iso_3166_1: 'US',
    name: 'Wick Fire Questions',
    key: 'Z1Pn3CqXCTs',
    site: 'YouTube',
    size: 1080,
    type: 'Featurette',
    official: true,
    published_at: '2023-03-24T11:10:24.000Z',
    id: '641d943ae0ec510081551683',
  },
];

const trailer = {
  iso_639_1: 'en',
  iso_3166_1: 'US',
  name: 'Official Trailer',
  key: 'qEVUtrk8_B4',
  site: 'YouTube',
  size: 1080,
  type: 'Trailer',
  official: true,
  published_at: '2022-11-10T17:00:03.000Z',
  id: '636d2d9d1684f7007735a5e2',
};

describe('Trailer Reducer', () => {
  it('Should return a new state when no movie trailers are found', () => {
    const action = setTrailer([]);
    const state = trailerReducers(undefined, action);

    expect(state.trailerId).toEqual('None trailer');
  });

  it('Should return a new state if no official trailer for the movie is found', () => {
    const action = setTrailer(trailerList);
    const state = trailerReducers(undefined, action);

    expect(state.trailerId).toEqual(trailerList[0].key);
  });

  it('Should return a new state if there is an official movie trailer', () => {
    const action = setTrailer(trailerList.concat(trailer));
    const state = trailerReducers(undefined, action);

    expect(state.trailerId).toEqual(trailer.key);
  });
});
