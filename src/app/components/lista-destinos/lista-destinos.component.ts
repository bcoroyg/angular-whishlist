import { Component, OnInit } from '@angular/core';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { DestinoViaje } from '../../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  constructor(public destinosApiClient:DestinosApiClient) {

  }

  ngOnInit(): void {
  }

  guardar(titulo:string, subtitulo:string, urlImg:string):boolean{
    const destino = new DestinoViaje(titulo,subtitulo,urlImg)
    this.destinosApiClient.add(destino);
    //console.log(this.destinos);
    return false
  }

  elegido(d: DestinoViaje){
    this.destinosApiClient.getAll().forEach((destino)=> {
      destino.setSelected(false);
    });
    d.setSelected(true);
  }
}
