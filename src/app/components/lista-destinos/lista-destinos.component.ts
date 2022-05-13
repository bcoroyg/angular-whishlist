import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { DestinoViaje } from '../../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  constructor(public destinosApiClient:DestinosApiClient) {
    this.onItemAdded=new EventEmitter();
  }

  ngOnInit(): void {

  }

  agregar(destino: DestinoViaje){
    this.destinosApiClient.add(destino);
    this.onItemAdded.emit(destino);
  }

  guardar(titulo:string, subtitulo:string, urlImg:string):boolean{
    const destino = new DestinoViaje(titulo,subtitulo,urlImg)
    this.destinosApiClient.add(destino);
    this.onItemAdded.emit(destino);
    //console.log(this.destinos);
    return false
  }

  elegido(dest: DestinoViaje){
    this.destinosApiClient.getAll().forEach((destino)=> {
      destino.setSelected(false);
    });
    dest.setSelected(true);
  }
}
