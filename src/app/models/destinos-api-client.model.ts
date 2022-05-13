import { DestinoViaje } from './destino-viaje.model';

export class DestinosApiClient {
  destinos: DestinoViaje[];
  constructor() {
    this.destinos = [];
  }
  add(d: DestinoViaje) {
    this.destinos.push(d);
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
