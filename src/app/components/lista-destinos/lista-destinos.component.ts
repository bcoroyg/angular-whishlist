import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers:[DestinosApiClient]
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
          this.updates.push("Se eligió: " + destino.title);
        }
      });
  }

  ngOnInit(): void {
  }

  agregar(destino: DestinoViaje){
    this.destinosApiClient.add(destino);
    this.onItemAdded.emit(destino);
  }

  elegido(destino: DestinoViaje){
    this.destinosApiClient.elegir(destino);
  }

}
