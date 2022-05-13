import { Component, OnInit } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {

  destinos: DestinoViaje[];
  constructor() {
    this.destinos = []
  }

  ngOnInit(): void {
  }

  guardar(titulo:string, subtitulo:string, urlImg:string):boolean{
    this.destinos.push(new DestinoViaje(titulo,subtitulo,urlImg));
    console.log(this.destinos);
    return false
  }

}
