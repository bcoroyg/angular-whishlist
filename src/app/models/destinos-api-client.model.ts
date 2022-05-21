import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { DestinoViaje } from './destino-viaje.model';
import * as destinosViajesActions from '../store/destinos-viajes/destinos-viajes.action'
import { Injectable } from '@angular/core';

@Injectable()
export class DestinosApiClient {
  destinos: DestinoViaje[];
  constructor(private store: Store<AppState>) {
    this.destinos = [];
    this.store
      .select(state => state.destinos)
      .subscribe((data) => {
        console.log("Datos de Items de Storage");
        console.log(data);
        this.destinos = data.items;
    });
    this.store
      .subscribe((data) => {
        console.log("Datos del Store");
        console.log(data);
      });
  }
  add(destino:DestinoViaje) {
    this.store.dispatch(destinosViajesActions.NuevoDestinoAction({destino}));
  }
  getAll(): DestinoViaje[] {
    return this.destinos;
  }
  getById(id: string|null): DestinoViaje {
    return this.destinos.filter((destino) => {
      return destino.id == id;
    })[0];
  };

  elegir(destino: DestinoViaje):void {
    this.store.dispatch(destinosViajesActions.ElegidoFavoritoAction({destino}));
  };
}
