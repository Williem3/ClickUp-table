import {props} from '@ngrx/store';
import {createAction} from '@ngrx/store';
export enum pageActionTypes {
    LoadNextMovies = '[Movies Data] Load Next Movies',
    LoadPreviousMovies = '[Movies Data] Load Previous Movies',
    LoadLastMovies = '[Movies Data] Load Last Movies',
    LoadFirstMovies = '[Movies Data] Load First Movies',
    SetMoviesMaxPages = '[Movies Data] Set total pages',
}

export const loadNext = createAction(pageActionTypes.LoadNextMovies);
export const loadPrevious = createAction(pageActionTypes.LoadPreviousMovies);
export const loadFirst = createAction(pageActionTypes.LoadFirstMovies);
export const loadLast = createAction(pageActionTypes.LoadLastMovies);
export const setTotalPages = createAction(
    pageActionTypes.SetMoviesMaxPages,
    props<{totalPages: number}>()
);
