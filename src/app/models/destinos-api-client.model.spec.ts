
import { DestinosViajesState, intializeDestinosViajesState, reducerDestinosViajes } from '../store/destinos-viajes/destinos-viajes.reducer';
import * as destinosViajesActions from '../store/destinos-viajes/destinos-viajes.action'

describe('reducerDestinosViajes', () => {
  it('should reduce init data', () => {
    const prevState: DestinosViajesState = intializeDestinosViajesState;
    const action = destinosViajesActions.LoadDataAction({destinos:[
      {
        title:'destino 1',
        subtitle:'barcelona'
      },
      {
        title:'destino 2',
        subtitle:'barcelona'
      }
    ]});
    const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
    expect(newState.items.length).toEqual(2);
    expect(newState.items[0].title).toEqual('destino 1');
  });

  it('should reduce new item added', () => {
    const prevState: DestinosViajesState = intializeDestinosViajesState;
    const action = destinosViajesActions.NuevoDestinoAction({destino:{
      title:'barcelona',
      subtitle:'barcelona'
    }});
    const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
    expect(newState.items.length).toEqual(1);
    expect(newState.items[0].title).toEqual('barcelona');
  });
});
