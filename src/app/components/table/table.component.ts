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
  table: any[] = [
    {title: 'Name'},
    {title: 'Release Date'},
    {title: 'Rating'},
    {title: 'Language'},
  ];

  movieObjectsArray: any[] = [];

  moviesInArray: any[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.retrieveLatest()
      .subscribe((res: any) => {
        this.movieObjectsArray = res.results;
        this.mergeObjectToArray(this.movieObjectsArray);
      })
  }


  mergeObjectToArray(arrayOfObjects) {
    this.moviesInArray = [];
    for (let i = 0; i < arrayOfObjects.length; i++) {
      let objectArray: any[] = [];
      objectArray.push(arrayOfObjects[i].original_title);
      objectArray.push(arrayOfObjects[i].release_date);
      objectArray.push(arrayOfObjects[i].vote_average);
      if (arrayOfObjects[i].original_language === "en") {
        objectArray.push('English');
      } else if (arrayOfObjects[i].original_language === "fr") {
        objectArray.push('French');
      } else {
        objectArray.push(arrayOfObjects[i].original_language);
      }
      this.moviesInArray.push(objectArray);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.table, event.previousIndex, event.currentIndex);
  
    this.moviesInArray.forEach(movie => {
      moveItemInArray(movie, event.previousIndex, event.currentIndex);
    });

  }

  sort(header) {
    let newHeader;
    if (header === 'Release Date') {
      newHeader = 'release_date';
    } else if (header === 'Name') {
      newHeader = 'original_title';
    } else if (header === 'Language') {
      newHeader = 'original_language';
    } else if (header === 'Rating') {
      newHeader = 'vote_average';
    }

  }
}
