import { BehaviorSubject, Subject } from 'rxjs';
import { DestinoViaje } from './destino-viaje.model';

export class DestinosApiClient {
  destinos: DestinoViaje[];
  current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null as any)
  constructor() {
    this.destinos = [];
  }
  add(destino:DestinoViaje):void {
    this.destinos.push(destino);
  }
  getAll(): DestinoViaje[] {
    return this.destinos;
  }
  getById(id: string|null): DestinoViaje {
    return this.destinos.filter((destino) => {
      return destino.id.toString() == id;
    })[0];
  };

  elegir(destino: DestinoViaje):void {
    this.destinos.forEach(destino => {
      return destino.setSelected(false);
    });
    destino.setSelected(true);
    this.current.next(destino);
  };

  subscribeOnChange(fn: any){
    this.current.subscribe(fn)
  }

}
