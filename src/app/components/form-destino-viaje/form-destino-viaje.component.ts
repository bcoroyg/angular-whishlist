import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg:FormGroup;

  minLongSub:number=3;

  constructor(fb:FormBuilder) {
    this.onItemAdded=new EventEmitter();
    this.fg = fb.group({
      titulo:['', Validators.compose([Validators.required, this.tituloValidator])],
      subtitulo:['', [Validators.required, this.subtituloValidatorParametrizable(this.minLongSub)]],
      imagen:['', Validators.required]
    });

/*     this.fg.valueChanges.subscribe((form:any)=> {
      console.log("Cambio Form -->",form)
    });

    this.fg.controls['titulo'].valueChanges.subscribe((value: string) => {
      console.log('titulo cambio: ', value);
    }); */
  }

  ngOnInit(): void {
  }

  guardar(titulo:string, subtitulo:string, urlImg:string):boolean{
    const destino = new DestinoViaje(titulo,subtitulo,urlImg)
    this.onItemAdded.emit(destino);
    return false
  };

  tituloValidator(control: FormControl): { [keyValid: string]: boolean } {
    const longitud = control.value.toString().trim().length;
    if (longitud > 0 && longitud < 5) {
      return { invalidTitulo: true };
    };
    return {};
  }

  subtituloValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: AbstractControl): { [keyValid: string]: boolean } | null => {
      const longitud = control.value.toString().trim().length;
      if (longitud > 0 && longitud < minLong) {
        return { minLongSubtitulo: true };
      }
      return null;
    };
  }

}
