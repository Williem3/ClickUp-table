import {map, mergeMap} from 'rxjs/operators';
import * as MovieConvertActions from './../actions/movie-convert.actions';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {MovieService} from 'src/app/services/movie.service';
import {MovieResults, Movie} from 'src/app/types/movie.interface';

@Injectable()
export class MovieConvertEffects {
    movieArray$: Array<any> = [];
    movieArrArr$: Array<any> = [];

    constructor(
        private actions$: Actions,
        private service: MovieService,
        private store: Store,
        private movieStore: Store<{movieState: Movie}>
    ) {}

    convertToArray$ = createEffect(() => {
        console.log('testing 1');
        return this.actions$.pipe(
            ofType(MovieConvertActions.movieConvertActionTypes.ConvertToArray),
            mergeMap(() => {
                return this.movieStore
                    .select((state) => state.movieState)
                    .pipe(
                        map((data: any) => {
                            // console.log(data.movies.results[0])
                            let objectArr = []
                            for (let i = 0; i < data.movies.results; i++) {
                                if (Object.keys(data.movies.results[i]).includes( 'original_title')) {
                                    objectArr.push();
                                }
                            }
                            console.log(this.movieArray$);
                            return MovieConvertActions.convertSuccess({
                                movieTable: this.movieArray$,
                            });
                        })
                    );
            })
        );
    });

    getStore() {
        this.movieStore
            .select((state) => state.movieState)
            .subscribe((data: Movie) => {
                this.movieArray$ = data.movies.results;
            });
    }
}
