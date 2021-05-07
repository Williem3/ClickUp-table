import { MovieArray } from './../../types/movie.interface';
import { createAction, props } from '@ngrx/store';

export enum movieConvertActionTypes {
    ConvertToArray = '[Movies Data] Converting Movies',
    ConvertSuccessful = '[Movies Data] Conversion was successful',
    ConvertFailure = '[Movies Data] Load Last Movies',
}


export const convertToArray = createAction(movieConvertActionTypes.ConvertToArray);
export const convertSuccess = createAction(
    movieConvertActionTypes.ConvertSuccessful,
    props<{movieTable: Array<any>}>()
);
export const convertFailure = createAction(movieConvertActionTypes.ConvertFailure);