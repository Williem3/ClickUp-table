import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiKey: string = '?api_key=2b9fd2f7326053e8e2cb3c0478856980'
  url: string = 'https://api.themoviedb.org/3'

  constructor(private http: HttpClient) { }

  retrieveLatest() {
    return this.http.get(`${this.url}/movie/popular${this.apiKey}&language=en-US`);
  }
  retrieveLatestPagination(currentPage) {
    return this.http.get(`${this.url}/movie/popular${this.apiKey}&language=en-US&page=${currentPage}`);
  }
}
