import { Component, OnInit } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  destinos: DestinoViaje[];

  constructor() {
    this.destinos = []
  }

  ngOnInit(): void {
  }

  guardar(titulo:string, subtitulo:string, urlImg:string):boolean{
    this.destinos.push(new DestinoViaje(titulo,subtitulo,urlImg));
    //console.log(this.destinos);
    return false
  }

  elegido(d: DestinoViaje){
    this.destinos.forEach((destino)=> {
      destino.setSelected(false);
    });
    d.setSelected(true);
  }
}