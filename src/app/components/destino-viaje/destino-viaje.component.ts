import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { AppState } from 'src/app/store';
import * as destinosViajesActions from '../../store/destinos-viajes/destinos-viajes.action'
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css'],
  animations: [
    trigger('esFavorito', [
      state('estadoFavorito', style({
        backgroundColor: 'PaleTurquoise'
      })),
      state('estadoNoFavorito', style({
        backgroundColor: 'WhiteSmoke'
      })),
      transition('estadoNoFavorito => estadoFavorito', [
        animate('3s')
      ]),
      transition('estadoFavorito => estadoNoFavorito', [
        animate('1s')
      ]),
    ])]
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino: DestinoViaje = {
    _id:'',
    title:'',
    subtitle:'',
    imgUrl:'',
    services: [],
    selected: false,
    votes:0,
  };
  @Input() position: number = 0;

  @HostBinding('attr.class') cssClass = 'col-md-4';

  @Output() clicked: EventEmitter<DestinoViaje>;

  constructor(private store: Store<AppState>) {
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ir(): boolean{
    this.clicked.emit(this.destino)
    return false
  }

  voteUp(){
    this.store.dispatch(destinosViajesActions.VoteUpAction({destino:{...this.destino}}))
    return false;
  }

  voteDown(){
    this.store.dispatch(destinosViajesActions.VoteDownAction({destino:{...this.destino}}))
    return false;
  }

}
