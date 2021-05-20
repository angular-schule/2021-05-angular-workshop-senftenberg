import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor() {}

  ngOnInit(): void {
    this.books = [
      {
        isbn: '111',
        title: 'Angular',
        description: 'Das rote Buch',
        price: 36.9,
        rating: 5
      },
      {
        isbn: '222',
        title: 'React',
        description: 'Das blaue Buch',
        price: 32.9,
        rating: 3
      }
    ];
  }

  doRateUp(book: Book): void {
    console.log('UP', book);
  }

  doRateDown(book: Book): void {
    console.log('DOWN', book);
  }

}

/*
class BookC {
  isbn: string;
  title: string;
  rating = 0;

  constructor(isbn: string, title: string) {
    this.isbn = isbn;
    this.title = title;
  }

  rateUp() {
    this.rating++;
  }
}

const myBookC = new BookC('111', 'Angular');
myBookC.rateUp();*/

////////////////////////
/*
interface Readable {
  title: string;
}

interface BookI extends Readable {
  isbn: string;
}

const myBookI: BookI = {
  title: 'Angular',
  isbn: '111',
};

function rateUp(b: BookI): BookI {
  // ...
  return b;
}*/