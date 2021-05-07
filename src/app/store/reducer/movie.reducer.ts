import {movieInitialState, MovieState} from './../states/movie.state';
import {Action, createReducer, on} from '@ngrx/store';
import * as MovieActions from '../actions/movie.actions';

const movieReducer = createReducer(
    movieInitialState,
    on(MovieActions.loadMovies, (state) => ({...state})),
    on(MovieActions.loadMoviesSuccessful, (state, {Movies}) => {
        return {
            ...state,
            movies: {
                total_pages: Movies.total_pages,
                total_results: Movies.total_results,
                page: Movies.page,
                results: Movies.results,
            },
        };
    })
);

export function reducer(state: MovieState | undefined, action: Action) {
    return movieReducer(state, action);
}
