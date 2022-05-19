import { ActionReducerMap } from '@ngrx/store';
import * as destinosViajesReducer from './destinos-viajes/destinos-viajes.reducer';

export interface AppState {
  destinos: destinosViajesReducer.DestinosViajesState;
}

export const reducers: ActionReducerMap<AppState> = {
  destinos: destinosViajesReducer.reducerDestinosViajes
};

export const reducersInitialState = {
  destinos: destinosViajesReducer.intializeDestinosViajesState
};
