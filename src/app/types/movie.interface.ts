export interface Movie {
    [x: string]: any;
    page: number,
    total_pages: number,
    total_results: number,
    results: Movie[]
}

export interface MovieResults {
    original_title: string;
    original_language: string;
    release_date: string;
    vote_average: number;
}