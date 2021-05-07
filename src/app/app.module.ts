import { MovieConvertEffects } from './store/effects/movie-convert.effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { TableComponent } from './components/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromMovie from './store/reducer/movie.reducer';
import * as fromConvertMovie from './store/reducer/movie-convert.reducer';
import * as fromMoviePage from './store/reducer/movie-page.reducer';
import { MovieEffects } from './store/effects/movie.effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
@NgModule({
    declarations: [AppComponent, MovieListComponent, TableComponent],
    imports: [
        BrowserModule,
        DragDropModule,
        BrowserAnimationsModule,
        MatTableModule,
        HttpClientModule,
        StoreModule.forRoot({
            movieState: fromMovie.reducer,
            moviePageCounter: fromMoviePage.reducer,
            movieConvert: fromConvertMovie.reducer
        }),
        EffectsModule.forRoot([MovieEffects, MovieConvertEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
