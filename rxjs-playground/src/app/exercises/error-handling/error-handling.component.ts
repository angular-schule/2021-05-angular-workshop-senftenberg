import { Component } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-error-handling',
  templateUrl: './error-handling.component.html',
})
export class ErrorHandlingComponent {

  logStream$ = new ReplaySubject<string>();

  constructor(private es: ExerciseService) { }

  /**
   * Das Observable aus `this.es.randomError()` liefert mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln:
   * - wiederholen
   * - Fehler weiterwerfen
   * - Fehler umwandeln (in ein normales Element)
   * - Fehler verschlucken/ignorieren
   */

  start() {
    this.es.randomError().pipe(
      // retry(3)
      catchError(err => {
        console.log('BÖSER FEHLER', err);
        // return throwError('GANZ SCHLIMMER FEHLER!'); // weiterwerfen
        // return of('Nichts', 'passiert'); // ersetzen
        return EMPTY; // verschlucken
      })
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err)
    });
  }
}

// Exkurs: Eigener Operator
function foo() {
  return function(source$: Observable<any>): Observable<any> {
    return source$.pipe(catchError(err => {
      return EMPTY;
    }));
  }
}