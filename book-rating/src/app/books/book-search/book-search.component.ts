import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  searchControl = new FormControl('');
  results$: Observable<Book[]>;
  loading = false;

  constructor(private bs: BookStoreService) {
    this.results$ = this.searchControl.valueChanges.pipe(
      filter(value => value.length >= 3),
      debounceTime(500),
      tap(() => this.loading = true),
      switchMap(value => this.bs.search(value)),
      tap(() => this.loading = false),
    );
  }

  ngOnInit(): void {
  }

}

/*
- Suchbegriff muss 3 Zeichen oder länger sein
- erst abschicken, wenn Nutzer für bestimtme Zeit Finger stillhält
- zum Server (this.bs.search)
- Ergebnisse anzeigen (ganz einfach)
- Extra: AsyncPipe
- Extra: Ladeindikator
*/
