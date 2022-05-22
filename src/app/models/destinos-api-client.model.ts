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
      .subscribe((data) => {;
        this.destinos = data.items;
    });
  }
  add(destino:DestinoViaje) {
    this.store.dispatch(destinosViajesActions.NuevoDestinoAction({destino:{...destino}}));
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
    this.store.dispatch(destinosViajesActions.ElegidoFavoritoAction({destino:{...destino}}));
  };
}
