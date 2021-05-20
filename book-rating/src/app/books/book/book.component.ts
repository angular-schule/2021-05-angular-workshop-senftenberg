import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() book?: Book;

  constructor() {
  }

  ngOnInit(): void {
  }
  
  getStars(): unknown[] {
    if (this.book && this.book.rating > 0) {
      return new Array(this.book.rating);
    } else {
      return [];
    }

  }
}
