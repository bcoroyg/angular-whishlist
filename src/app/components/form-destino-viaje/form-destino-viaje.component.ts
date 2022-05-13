import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg:FormGroup;
  constructor(fb:FormBuilder) {
    this.onItemAdded=new EventEmitter();
    this.fg = fb.group({
      titulo:['', Validators.required],
      subtitulo:['', Validators.required],
      imagen:['', Validators.required]
    });

    this.fg.valueChanges.subscribe((form:any)=> {
      console.log("Cambio Form -->",form)
    })
  }

  ngOnInit(): void {
  }

  guardar(titulo:string, subtitulo:string, urlImg:string):boolean{
    const destino = new DestinoViaje(titulo,subtitulo,urlImg)
    this.onItemAdded.emit(destino);
    return false
  }

}
