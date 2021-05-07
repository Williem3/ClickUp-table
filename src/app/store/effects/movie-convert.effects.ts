import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import * as MovieConvertActions from './../actions/movie-convert.actions';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {MovieService} from 'src/app/services/movie.service';
import {MovieResults, Movie} from 'src/app/types/movie.interface';
import { Observable } from 'rxjs';

@Injectable()
export class MovieConvertEffects {
    movieArrArr$: Array<any> = [];
    movie: any;

    constructor(
        private actions$: Actions,
        private service: MovieService,
        private store: Store,
        private movieStore: Store<{movieState: Movie}>
    ) {}

    convertToArray$ = createEffect(() => {
        this.actions$.pipe(
            ofType(MovieConvertActions.movieConvertActionTypes.ConvertToArray),
            withLatestFrom(this.movieStore.select((state) => state.movieState.results)),
            mergeMap((data) => {
                return selectFeature(data).pipe(
                    map((movies: Array<any>) => {
                        return MovieConvertActions.convertSuccess({movieTable: movies})
                    }),
                    catchError(() => MovieConvertActions.convertFailure)
                )
            })
        )
    });


    conversion(data) {
        let arr = []
        for (let i = 0; i < data.length; i++) {
            arr.push(data[i].original_title);
        }
        console.log(arr);
        this.movieArrArr$.push(arr);
        return this.movieArrArr$;
    }

}

