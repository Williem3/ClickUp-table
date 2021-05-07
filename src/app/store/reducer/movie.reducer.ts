import {movieInitialState, MovieState} from './../states/movie.state';
import {Action, createReducer, on} from '@ngrx/store';
import * as MovieActions from '../actions/movie.actions';

const movieReducer = createReducer(
    movieInitialState,
    on(MovieActions.loadMovies, (state) => ({...state})),
    on(MovieActions.loadMoviesSuccessful, (state, {movies}) => {
        return {
            ...state,
            movies: {
                total_pages: movies.total_pages,
                total_results: movies.total_results,
                page: movies.page,
                results: movies.results,
            },
        };
    })
);

export function reducer(state: MovieState | undefined, action: Action) {
    return movieReducer(state, action);
}
