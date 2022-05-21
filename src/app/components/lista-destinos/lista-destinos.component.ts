import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  constructor(
      public destinosApiClient:DestinosApiClient,
      private store: Store<AppState>
  ) {
    this.onItemAdded=new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
    .subscribe(destino => {
      if (destino != null) {
        this.updates.push("Se eligió: " + destino.titulo);
      }
    });
  }

  ngOnInit(): void {

  }

  agregar(destino: DestinoViaje){
    const newDestino = {
      id:uuid(),
       ...destino,
    }
    this.destinosApiClient.add(newDestino);
    this.onItemAdded.emit(destino);
  }

  elegido(destino: DestinoViaje){
    this.destinosApiClient.elegir(destino);
  }

}
