import { Action, createReducer, on } from "@ngrx/store";
import { DestinoViaje } from "../../models/destino-viaje.model";
import * as destinosViajesActions from './destinos-viajes.action'
// ESTADO
export interface DestinosViajesState {
  items: DestinoViaje[];
  loading: boolean;
  favorito: DestinoViaje;
}

export const intializeDestinosViajesState: DestinosViajesState = {
  items: [],
  loading: false,
  favorito: null as any
}

const reducer = createReducer(
  intializeDestinosViajesState,
  on(destinosViajesActions.NuevoDestinoAction,(state, {destino})=> {
    return {
      ...state,
      loading: true,
      items: [...state.items, destino]
    };
  }),
  on(destinosViajesActions.ElegidoFavoritoAction, (state, {destino})=> {
    let items= [...state.items.map(item => {
      if(item.id === destino.id){
        item = {...item,selected:true}
      }else{
        item = {...item,selected:false}
      };
      return item
    })]
    return {
      ...state,
      items,
      loading: true,
      favorito:{
        ...destino,
        selected:true
      }
     };
  }),
    on(destinosViajesActions.VoteUpAction, (state, {destino})=> {
    let items= [...state.items.map(item => {
      let itemCopy = {...item}
      if(itemCopy.votes===undefined){
        itemCopy.votes=0
      }
      if(itemCopy.id === destino.id){
        itemCopy.votes+=1;
      };
      return itemCopy
    })]
    return {
        ...state,
        items
    };
  }),
  on(destinosViajesActions.VoteDownAction, (state, {destino})=> {
    let items= [...state.items.map(item => {
      let itemCopy = {...item}
      if(itemCopy.votes===undefined){
        itemCopy.votes=0
      }
      if(itemCopy.id === destino.id){
        if(item.votes===0){
          itemCopy.votes=0
        }else{
          itemCopy.votes-=1;
        }
      };
      return itemCopy
    })]
    return {
        ...state,
        items,
    };
  }),
);

export function reducerDestinosViajes(state: DestinosViajesState = intializeDestinosViajesState, action: Action): DestinosViajesState{
  return reducer(state, action)
};
