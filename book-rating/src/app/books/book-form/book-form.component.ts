import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm = new FormGroup({
    isbn: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    description: new FormControl(''),
    price: new FormControl(1, [
      Validators.min(1)
    ]),
    rating: new FormControl(5, [
      Validators.min(1),
      Validators.max(5),
    ])
  });

  @Output() submitBook = new EventEmitter<Book>();

  constructor() {}

  ngOnInit(): void {}

  submitForm() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const newBook: Book = this.bookForm.value;
    this.submitBook.emit(newBook);
  }

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.touched && control.hasError(errorCode);
  }

}

/*
- Button
- Invalides Formular???!
- Abschicken
- Buch bauen
- Event
- wegnavigieren (Elternkomponente)
*/