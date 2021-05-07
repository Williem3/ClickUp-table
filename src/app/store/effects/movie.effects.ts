import {MovieService} from 'src/app/services/movie.service';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators';
import * as MovieActions from '../actions/movie.actions';
import { Movie } from 'src/app/types/movie.interface';

@Injectable()
export class MovieEffects {
    constructor(private actions$: Actions, private service: MovieService, private store: Store) {}

    loadMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MovieActions.loadMovies),
            mergeMap(() =>
                this.service.retrieveLatest(this.service.page$).pipe(
                    map((movies: Movie) => {
                        return MovieActions.loadMoviesSuccessful({Movies: movies});
                    }),
                    catchError(() => EMPTY)
                )
            )
        )
    );
}
