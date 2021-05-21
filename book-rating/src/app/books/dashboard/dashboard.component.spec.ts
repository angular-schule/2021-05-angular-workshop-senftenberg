import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let book: Book;
  let ratingMock: BookRatingService;

  beforeEach(async () => {
    book = {
      isbn: '',
      title: '',
      description: '',
      rating: 3,
      price: 3
    };

    ratingMock = {
      rateUp: b => b,
      rateDown: b => b,
    } // as BookRatingService; // Type Assertion

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: BookRatingService, useValue: ratingMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service for doRateUp', () => {
    // ratingMock überwachen. Alle Aufrufe trotzdem an Mock durchleiten
    spyOn(ratingMock, 'rateUp').and.callThrough();

    // Act
    component.doRateUp(book);

    // Assert
    expect(ratingMock.rateUp).toHaveBeenCalled();
  });
});
