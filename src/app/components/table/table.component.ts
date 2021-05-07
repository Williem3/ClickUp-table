import { Movie } from 'src/app/types/movie.interface';
import {pageActionTypes} from './../../store/actions/movie-page.actions';
import {MovieState} from './../../store/states/movie.state';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import * as MovieActions from '../../store/actions/movie.actions';
import * as MoviePageActions from '../../store/actions/movie-page.actions';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    movies$: Observable<Movie>;
    movieArray$: Observable<Movie[]>;

    tableHeaders: any[] = ['Title', 'Release Date', 'Language', 'Rating'];

    constructor(private store: Store<{movieState: Movie}>) {}

    ngOnInit(): void {
        this.store.dispatch({type: MovieActions.MovieActionTypes.LoadMovies});

        this.store
            .select((state) => state.movieState)
            .subscribe((data: Movie) => {
                this.movies$ = data.movies;
                this.movieArray$ = data.movies.results;
                this.store.dispatch(
                    MoviePageActions.setTotalPages({totalPages: data.movies.total_pages})
                );
            });
    }
    onPrevious() {
        this.store.dispatch({type: pageActionTypes.LoadPreviousMovies});
        this.store.dispatch({type: MovieActions.MovieActionTypes.LoadMovies});
    }
    onNext() {
        this.store.dispatch({type: pageActionTypes.LoadNextMovies});
        this.store.dispatch({type: MovieActions.MovieActionTypes.LoadMovies});
    }

    onLast() {
        this.store.dispatch({type: pageActionTypes.LoadLastMovies});
    }
}
