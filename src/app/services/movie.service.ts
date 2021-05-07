import {Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MoviePageInterface} from 'src/app/types/movie-page.interface';

@Injectable({
    providedIn: 'root',
})
export class MovieService {
    apiKey: string = '?api_key=2b9fd2f7326053e8e2cb3c0478856980';
    url: string = 'https://api.themoviedb.org/3';
    page$: number;

    constructor(
        private http: HttpClient,
        private store: Store<{moviePageCounter: MoviePageInterface}>
    ) {
        this.initializeCurrentPage();
    }

    initializeCurrentPage() {
        this.store
            .select((state) => state.moviePageCounter)
            .subscribe((data) => {
                this.page$ = data.page;
            });
    }

    retrieveLatest(page) {
        if (page === 1) {
            return this.http.get(`${this.url}/movie/popular${this.apiKey}&language=en-US`);
        } else {
            return this.http.get(
                `${this.url}/movie/popular${this.apiKey}&language=en-US&page=${page}`
            );
        }
    }
}
