import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  destinos: string[];

  constructor() {
    this.destinos = [
      'Guatemala',
      'Antigua Guatemala',
      'Quetzaltenango',
      'Chimaltenango'
    ]
  }

  ngOnInit(): void {
  }

  guardar(titulo:string, subtitulo:string, urlImg:string):boolean{
    console.log(titulo, subtitulo, urlImg)
    return false
  }

}
