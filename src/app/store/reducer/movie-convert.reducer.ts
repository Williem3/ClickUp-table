import { MovieArray } from './../../types/movie.interface';
import { Action, createReducer, on } from '@ngrx/store';
import * as MovieConvertActions from './../actions/movie-convert.actions'

export interface MovieConvertState {
    movieTable: Array<any>
}

export const initialConvertState: MovieConvertState = {
    movieTable: []
}


export const convertReducer = createReducer(
    initialConvertState,
    on(MovieConvertActions.convertToArray, state => ({...state})),
    on(MovieConvertActions.convertSuccess, (state, {movieTable}) => ({
        ...state,
        movieTable: movieTable
    })
))


export function reducer(state: MovieConvertState | undefined, action: Action) {
    return convertReducer(state, action);
}