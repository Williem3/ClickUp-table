import {createSelector} from '@ngrx/store';
import { Movie } from 'src/app/types/movie.interface';

export interface FeatureState {
    movies: Movie;
}

export interface AppState {
    feature: FeatureState;
}

export const selectFeature = (state: AppState) => state.feature;

export const selectFeatureCount = createSelector(
    selectFeature,
    (state: FeatureState) => state.movies
);
