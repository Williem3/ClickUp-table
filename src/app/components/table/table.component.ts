import { MovieService } from './../../services/movie.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';


interface Movie {
  original_title: string,
  release_date: string,
  vote_average: string,
  original_language: string
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number;
  displaySecondList: boolean = false;

  table: any[] = [
    {title: 'Name'},
    {title: 'Release Date'},
    {title: 'Rating'},
    {title: 'Language'},
  ];

  movieObjectsArray: any[] = [];

  moviesInArray: any[] = [];
  secondInArray: any[] = [];
  tempPrevious: any[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.retrieveLatest()
      .subscribe((res: any) => {
        this.totalPages = res.total_pages;
        this.movieObjectsArray = res.results;
        this.objectsToArray(this.movieObjectsArray);
      })
  }

  retrieveMoviePage(page) {
    this.movieService.retrieveLatestPagination(this.currentPage)
    .subscribe((res: any) => {
      this.movieObjectsArray = res.results;
      this.objectsToArray(this.movieObjectsArray);
      this.resetHeaders();
    })
  }

  retrievePreviousMoviePage(page) {
    return this.movieService.retrieveLatestPagination(this.currentPage);
  }

  reassignList() {
    this.tempPrevious = this.moviesInArray;
    this.moviesInArray = this.secondInArray;
    this.secondInArray = this.tempPrevious;
  }
  resetHeaders() {
    this.table = [
      {title: 'Name'},
      {title: 'Release Date'},
      {title: 'Rating'},
      {title: 'Language'},
    ];
  }
  previousPage() {
    if (this.displaySecondList) {
      this.reassignList();
      this.displaySecondList = false;
    } else {
      this.currentPage--;
      this.retrievePreviousMoviePage(this.currentPage).subscribe((res: any) => {
        this.movieObjectsArray = res.results;
        this.objectsToArray(this.movieObjectsArray);
        this.reassignList();
        this.resetHeaders();
      });
      this.displaySecondList = true;
    }
  }
  nextPage() {
    if (this.displaySecondList) {
      this.currentPage++;
      this.tempPrevious = this.moviesInArray;
      this.retrieveMoviePage(this.currentPage);
      this.displaySecondList = false;
    } else {
      this.reassignList();
      this.displaySecondList = true;
    }
  }
  goFirst() {
    this.displaySecondList = false;
    this.currentPage = 1;
    this.retrieveMoviePage(this.currentPage);
  }
  goLast() {
    this.currentPage = this.totalPages;
    this.retrievePreviousMoviePage(this.currentPage).subscribe((res: any) => {
      this.movieObjectsArray = res.results;
      this.objectsToArray(this.movieObjectsArray);
      this.reassignList();
    });
    this.displaySecondList = true;
  }

  objectsToArray(arrayOfObjects) {
    this.moviesInArray = [];
    // created second array to shorten the amount of entries in the table per page. 
    this.secondInArray = [];
    for (let i = 0; i < arrayOfObjects.length; i++) {
      let objectArray: any[] = [];
      if (this.moviesInArray.length > 9) {
        objectArray = this.transformObjectToArray(objectArray, arrayOfObjects, i);
        this.secondInArray.push(objectArray);
      } else {
        objectArray = this.transformObjectToArray(objectArray, arrayOfObjects, i);
        this.moviesInArray.push(objectArray);
      }
    }
  }

  transformObjectToArray(array, object, index) {
    array.push(object[index].original_title);
    array.push(object[index].release_date);
    array.push(object[index].vote_average);
    if (object[index].original_language === "en") {
      array.push('English');
    } else if (object[index].original_language === "fr") {
      array.push('French');
    } else if (object[index].original_language === "es"){
      array.push('Spanish');
    } else if (object[index].original_language === "zh"){
      array.push('Chinese');
    } else if (object[index].original_language === "ja"){
      array.push('Japanese');
    } else if (object[index].original_language === "ru"){
      array.push('Russian');
    } else if (object[index].original_language === "ko"){
      array.push('Korean');
    } else if (object[index].original_language === "hi"){
      array.push('Hindi');
    } else { array.push(object[index].original_language)}

    return array;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.table, event.previousIndex, event.currentIndex);
  
    this.moviesInArray.forEach(movie => {
      moveItemInArray(movie, event.previousIndex, event.currentIndex);
    });
    this.secondInArray.forEach(movie => {
      moveItemInArray(movie, event.previousIndex, event.currentIndex);
    })
    this.tempPrevious.forEach(movie => {
      moveItemInArray(movie, event.previousIndex, event.currentIndex);
    })

  }

  sort(header, index) {
    if (header === 'Release Date') {
      this.sortDate(index);
    } else if (header === 'Name') {
        this.sortAlphabetical(index);
    } else if (header === 'Language') {
        this.sortAlphabetical(index);
    } else if (header === 'Rating') {
      this.sortRating(index);
    }
  }

  checkRateSort(array, index) {
    for (let i = 0; i < this.moviesInArray.length-1; i++) {
      if (array[i][index] > array[i+1][index]) return false; 
    }
    return true;
  }

  checkStringSort(array, index) {
    for (let i = 0; i < array.length-1; i++) {
      if (array[i][index].toLowerCase() > array[i+1][index].toLowerCase()) return false;
    }
    return true;
  }

  sortAlphabetical(index) {
    if (!this.checkStringSort(this.moviesInArray, index)) {
      this.moviesInArray.sort((a, b) => { return a[index].localeCompare(b[index]); });
    } else {
      this.moviesInArray.sort((a, b) => { return b[index].localeCompare(a[index]); });
    }
    
  }

  sortRating(index) {
    if (!this.checkRateSort(this.moviesInArray, index)) {
      this.moviesInArray.sort((a, b) => { return a[index] - b[index]; });
    } else { 
      this.moviesInArray.sort((a, b) => { return b[index] - a[index]; });
    }
  }

  sortDate(index) {
    if (!this.checkStringSort(this.moviesInArray, index)) {
      this.moviesInArray.sort((a, b) => { return a[index].localeCompare(b[index]) })
    } else {
      this.moviesInArray.sort((a, b) => { return b[index].localeCompare(a[index]) })
    }
  }


}

