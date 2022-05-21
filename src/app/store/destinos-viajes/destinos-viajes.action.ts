import { createAction, props } from "@ngrx/store";
import { DestinoViaje } from "../../models/destino-viaje.model";
// ACCIONES
export enum DestinosViajesActionTypes {
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo destino',
  ELEGIDO_FAVORITO = '[Destinos Viajes] Elegido favorito',
  LOAD_DATA = '[Destinos Viajes] Load Data',
  VOTE_UP = '[Destinos Viajes] Vote Up',
  VOTE_DOWN = '[Destinos Viajes] Vote Down',

}

export const LoadDataAction = createAction (
  DestinosViajesActionTypes.LOAD_DATA,
  props<{destinos: DestinoViaje[]}>()
)

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
