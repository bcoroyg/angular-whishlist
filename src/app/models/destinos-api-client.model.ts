import { DestinoViaje } from './destino-viaje.model';

export class DestinosApiClient {
  destinos: DestinoViaje[];
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
  }
}
