import { createAction, props } from "@ngrx/store";
import { DestinoViaje } from "../../models/destino-viaje.model";
// ACCIONES
export enum DestinosViajesActionTypes {
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
  ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
  VOTE_UP = '[Destinos Viajes] Vote Up',
  VOTE_DOWN = '[Destinos Viajes] Vote Down',
  INIT_MY_DATA = '[Destinos Viajes] Init My Data'
}

export const NuevoDestinoAction = createAction (
  DestinosViajesActionTypes.NUEVO_DESTINO,
  props<{destino: DestinoViaje}>()
)

export const ElegidoFavoritoAction = createAction (
  DestinosViajesActionTypes.ELEGIDO_FAVORITO,
  props<{destino: DestinoViaje}>()
)

export const VoteUpAction = createAction (
  DestinosViajesActionTypes.VOTE_UP,
  props<{destino: DestinoViaje}>()
)

export const VoteDownAction = createAction (
  DestinosViajesActionTypes.VOTE_DOWN,
  props<{destino: DestinoViaje}>()
)

export const InitMyDataAction = createAction (
  DestinosViajesActionTypes.INIT_MY_DATA,
  props<{destinos: string[]}>()
)
