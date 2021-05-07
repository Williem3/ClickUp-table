import {Movie} from './../../types/movie.interface';
import {createAction, props} from '@ngrx/store';

export enum MovieActionTypes {
    LoadMovies = '[Movies Data] Load data',
    LoadMoviesSuccess = '[Movies Data] Loaded data successfully',
    LoadMoviesFailure = '[Movies Data] Loading data failed',
    ConvertMoviesToArray = '[Movies Data] Converting data',
    ConvertMoviesSuccess = '[Movies Data] Data converted',
}

export const loadMovies = createAction(MovieActionTypes.LoadMovies);
export const loadMoviesFailed = createAction(MovieActionTypes.LoadMoviesFailure);
export const loadMoviesSuccessful = createAction(
    MovieActionTypes.LoadMoviesSuccess,
    props<{movies: Movie}>()
);
