import { Component, OnInit } from '@angular/core';
import { Subject, ReplaySubject, of } from 'rxjs';
import { scan, reduce } from 'rxjs/operators';

@Component({
  selector: 'rxw-game-score',
  templateUrl: './game-score.component.html',
})
export class GameScoreComponent implements OnInit {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore = 0;
  finalScore: number;

  ngOnInit() {

    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den aktuellen und den finalen Punktestand zu ermitteln...
     */

    /******************************/

    this.score$.pipe(
      scan((acc, item) => acc + item, 0)
    ).subscribe(score => this.currentScore = score);

    this.score$.pipe(
      reduce((acc, item) => acc + item, 0)
    ).subscribe(score => this.finalScore = score);
    
    /******************************/


      of(
        // { type: 'SETNAME', payload: 'Ferdinand' },
        'SETNAMEFERDINAND',
        'SETCITYLEIPZIG',
        'SETFRMEWORKNG',
        'SETNAMEJUERGEN',
        'FOOBAR'
      ).pipe(
        scan((acc, msg) => {
          switch (msg) {
            case 'SETNAMEFERDINAND': return { ...acc, name: 'Ferdinand' };
            case 'SETCITYLEIPZIG': return { ...acc, city: 'Leipzig' };
            case 'SETNAMEJUERGEN': return { ...acc, name: 'Jürgen' };
            case 'SETNAMESTEFFI': return { ...acc, name: 'Steffi' };
            default: return acc;
          }
        }, { name: 'Franziska', city: 'Berlin' })
      ).subscribe(e => console.log(e))


    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
