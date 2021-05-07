export interface Movie {
    [x: string]: any;
    page: number,
    total_pages: number,
    total_results: number,
    results: MovieResults[]
}

export interface MovieResults {
    original_title: string;
    original_language: string;
    release_date: string;
    vote_average: number;
}

export interface MovieArray {
    movies: Array<any>
}