import { Component, EventEmitter, forwardRef, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap } from 'rxjs';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { ajax } from 'rxjs/ajax';
import { AppConfig, APP_CONFIG } from 'src/app/app.config';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg:FormGroup;
  searchResults:DestinoViaje[]=[];

  minLongSub:number=3;

  constructor(fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) {
    this.onItemAdded=new EventEmitter();
    this.fg = fb.group({
      title:['', Validators.compose([Validators.required, this.tituloValidator])],
      subtitle:['', [Validators.required, this.subtituloValidatorParametrizable(this.minLongSub)]],
      imgUrl:''
    });

/*     this.fg.valueChanges.subscribe((form:any)=> {
      console.log("Cambio Form -->",form)
    });

    this.fg.controls['titulo'].valueChanges.subscribe((value: string) => {
      console.log('titulo cambio: ', value);
    }); */
  }

  ngOnInit(): void {
        // const elemTitulo = <HTMLInputElement>document.getElementById('titulo');
        const elemTitulo = document.getElementById('title') as HTMLInputElement;
        fromEvent<KeyboardEvent>(elemTitulo, 'input')
          .pipe(
            map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
            filter(text => text.length > 2),
            debounceTime(200),
            distinctUntilChanged(),
           //switchMap(() => ajax('/assets/date.json'))
           switchMap((text: string) => ajax(this.config.apiEndpoint + '/destinations/search?q=' + text))
          )
          .subscribe(ajaxResponse => {
            this.searchResults = (ajaxResponse.response as any).destinations
          });
  }

  guardar(title:string, subtitle:string, imgUrl:string):boolean{
    const destino:DestinoViaje={title,subtitle,imgUrl}
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
