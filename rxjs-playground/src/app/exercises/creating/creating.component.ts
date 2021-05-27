import { Component, OnInit } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent implements OnInit {

  logStream$ = new ReplaySubject<string | number>();

  ngOnInit() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    function producer(o) {
      const result = 1+1;
      o.next(result);
      o.next(3);
      o.next(4);

      setTimeout(() => o.next(7), 2000);
      setTimeout(() => o.complete(), 4000);
    }

    const observer = {
      next: e => console.log(e),
      error: err => console.error(err),
      complete: () => console.log('C')
    };

    // producer(obs);

    const myObs$ = new Observable(producer);
    myObs$.subscribe(observer);

    timer(1000, 500).pipe(
      // take(5),
      map(value => value * 3),
      filter(value => value % 2 === 0)
    ).subscribe({
      next: value => this.log(value),
      error: err => this.log(err),
      complete: () => this.log('COMPLETE'),
    });

    /*setTimeout(() => {
      sub.unsubscribe();
    }, 5000);*/
    
    
    
    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
