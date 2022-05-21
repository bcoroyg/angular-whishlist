import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { DestinoViaje } from './destino-viaje.model';
import * as destinosViajesActions from '../store/destinos-viajes/destinos-viajes.action'
import { Injectable } from '@angular/core';

@Injectable()
export class DestinosApiClient {

  constructor(private store: Store<AppState>) {}
  add(destino:DestinoViaje) {
    this.store.dispatch(destinosViajesActions.NuevoDestinoAction({destino:{...destino}}));
  }

  elegir(destino: DestinoViaje):void {
    this.store.dispatch(destinosViajesActions.ElegidoFavoritoAction({destino:{...destino}}));
  };
}
