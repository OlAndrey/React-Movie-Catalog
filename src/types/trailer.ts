export interface ITrailerSearch {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export enum TrailerActionsTypes {
  SET_TRAILER = 'SET_TRAILER',
}

interface SetTrailer {
  type: TrailerActionsTypes.SET_TRAILER;
  trailerId: string;
}

export type TrailerType = SetTrailer;
