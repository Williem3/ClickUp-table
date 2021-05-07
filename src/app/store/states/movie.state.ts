import {Movie} from './../../types/movie.interface';

export interface MovieState {
    movies: Movie;
}

export const movieInitialState: MovieState = {
    movies: {
        total_pages: 0,
        total_results: 0,
        page: 0,
        results: [],
    },
};
