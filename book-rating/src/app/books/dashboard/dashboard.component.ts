import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { loadBooks } from '../store/book.actions';
import { selectAllBooks } from '../store/book.selectors';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private rs: BookRatingService, private bs: BookStoreService, private store: Store) {}

  ngOnInit(): void {
    // this.bs.getAll().subscribe(books => this.books = books);
    this.store.dispatch(loadBooks()); // Action auslösen, Laden starten

    const books$ = this.store.select(selectAllBooks); // store.pipe(select(.....))
    books$.subscribe(books => this.books = books); // TODO: AsyncPipe



    // this.bs.getSomeBooks(['9783864907791', '9783960091417', '9783864907845'])
      // .subscribe(books => console.log('SOME', books))
  }

  doRateUp(book: Book): void {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }
  
  doRateDown(book: Book): void {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book): void {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b);
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