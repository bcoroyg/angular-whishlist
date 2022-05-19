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
  updates: string[];
  constructor(public destinosApiClient:DestinosApiClient) {
    this.onItemAdded=new EventEmitter();
    this.updates = [];
    this.destinosApiClient.subscribeOnChange((destino: DestinoViaje)=> {
      if(destino != null){
        this.updates.push(`Se ha elegido a ${destino.titulo}`)
      }
    })
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

  elegido(destino: DestinoViaje){
    this.destinosApiClient.elegir(destino);

    /*     this.destinosApiClient.getAll().forEach((destino)=> {
      destino.setSelected(false);
    });
    dest.setSelected(true);
  } */
  }

}
