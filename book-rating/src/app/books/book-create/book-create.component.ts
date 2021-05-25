import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  constructor(private bs: BookStoreService) { }

  ngOnInit(): void {
  }

  create(book: Book) {
    console.log('CREATE', book);
    this.bs.create(book).subscribe();
    // TODO: wegnavigieren
  }

}
