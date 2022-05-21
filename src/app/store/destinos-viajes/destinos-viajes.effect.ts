import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, Observable } from "rxjs";
import * as destinosViajesActions from './destinos-viajes.action'

@Injectable()
export class DestinosViajesEffects {
  constructor(private actions$: Actions) { }
  nuevoAgregado$: Observable<Action> = createEffect( ()=> {
    return this.actions$.pipe(
      ofType(destinosViajesActions.NuevoDestinoAction),
      map(({destino}) => destinosViajesActions.ElegidoFavoritoAction({destino}))
    );
  })
}
