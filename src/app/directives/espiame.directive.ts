import { Directive } from '@angular/core';

@Directive({
  selector: '[appEspiame]'
})
export class EspiameDirective {

  constructor() { }
  static nextId = 0;
  log = (msg: string) => console.log(`Evento #${EspiameDirective.nextId++} ${msg}`);
  ngOnInit() { this.log(`########******** onInit`); }
  ngOnDestroy() { this.log(`########******** onDestroy`); }

}
