import { setTrailer } from '../../store/actions/trailerAction';
import { TrailerActionsTypes } from '../../types/trailer';

const trailers = [
  {
    id: '642231e623be4600febeb864',
    iso_639_1: 'en',
    iso_3166_1: 'US',
    key: 'vBwj0QpKbSM',
    name: 'Special Feature - Rina’s Range',
    official: true,
    published_at: '2023-03-24T21:08:20.000Z',
    site: 'YouTube',
    size: 1080,
    type: 'Featurette',
  },
];

describe('Get Trailer Id', () => {
  it('Should return an object containing the action and payload with the favorite movies', () => {
    const response = setTrailer(trailers);

    expect(response.type).toEqual(TrailerActionsTypes.SET_TRAILER);
    expect(response.trailerId).toEqual(trailers[0].key);
  });
});
