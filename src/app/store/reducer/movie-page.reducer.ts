import {Action, createReducer, on, State} from '@ngrx/store';
import * as MoviePageActions from '../actions/movie-page.actions';

export interface MoviePageState {
    page: number;
    previousPage: number;
    totalPages: number;
}

export const initialMoviePageState: MoviePageState = {
    page: 1,
    previousPage: 0,
    totalPages: 1,
};

const moviePageReducer = createReducer(
    initialMoviePageState,
    on(MoviePageActions.loadFirst, (state) => ({...state, page: 1})),
    on(MoviePageActions.loadNext, (state) => ({
        ...state,
        page: state.page + 1,
        previousPage: state.previousPage + 1,
    })),
    on(MoviePageActions.loadPrevious, (state) => ({
        ...state,
        page: state.page - 1,
        previousPage: state.previousPage - 1,
    })),
    on(MoviePageActions.loadLast, (state) => ({
        ...state,
        page: (state.page = state.totalPages),
        previousPage: (state.previousPage = state.totalPages - 1),
    })),
    on(MoviePageActions.setTotalPages, (state, {totalPages}) => ({
        page: state.page,
        previousPage: state.previousPage,
        totalPages: totalPages,
    }))
);

export function reducer(state: MoviePageState | undefined, action: Action) {
    return moviePageReducer(state, action);
}
