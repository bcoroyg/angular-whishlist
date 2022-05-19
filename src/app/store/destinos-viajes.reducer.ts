import { Action, createReducer, on } from "@ngrx/store";
import { DestinoViaje } from "../models/destino-viaje.model";
import * as destinosViajesActions from './destinos-viajes.action'
// ESTADO
export interface DestinosViajesState {
  items: DestinoViaje[];
  loading: boolean;
  favorito: DestinoViaje;
}

const intializeDestinosViajesState: DestinosViajesState = {
  items: [],
  loading: false,
  favorito: null as any
}

const reducerDestinosViajes = createReducer(
  intializeDestinosViajesState,
  on(destinosViajesActions.InitMyDataAction, (state, {destinos})=> {
    //const destinos: string[] = (action as InitMyDataAction).destinos;
    return {
        ...state,
        items: destinos.map((d) => new DestinoViaje(d, '',''))
    };
  }),
  on(destinosViajesActions.NuevoDestinoAction,(state, {destino})=> {
    return {
      ...state,
      items: [...state.items, destino]
  };
  }),
  on(destinosViajesActions.ElegidoFavoritoAction, (state, {destino})=> {
    state.items.forEach(x => x.setSelected(false));
    const fav: DestinoViaje = destino;
    fav.setSelected(true);
    return {
        ...state,
        favorito: fav
    };
  }),
  on(destinosViajesActions.VoteUpAction, (state, {destino})=> {
    const d: DestinoViaje = destino;
    d.voteUp();
    return {
        ...state
    };
  }),
  on(destinosViajesActions.VoteUpAction, (state, {destino})=> {
    const d: DestinoViaje = destino;
    d.voteDown();
    return {
        ...state
      };
  }),
);

export function reducer(state: DestinosViajesState = intializeDestinosViajesState, action: Action): DestinosViajesState{
  return reducerDestinosViajes(state, action)
};
