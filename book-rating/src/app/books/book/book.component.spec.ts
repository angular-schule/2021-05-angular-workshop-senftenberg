import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../shared/book';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event for doRateUp', () => {
    component.book = {
      isbn: '',
      title: '',
      description: '',
      rating: 3,
      price: 3
    };

    let emittedBook: Book | undefined;

    component.rateUp.subscribe(book => {
      emittedBook = book;
    });

    // Act
    component.doRateUp();

    // Bücher vergleichen
    expect(emittedBook).toBeDefined();
    expect(emittedBook).toBe(component.book);
  });
});
