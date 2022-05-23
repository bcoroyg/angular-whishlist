import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { DestinoViaje } from './destino-viaje.model';
import * as destinosViajesActions from '../store/destinos-viajes/destinos-viajes.action'
import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../app.config';
import { db } from '../services/database-indexed-db.service';

@Injectable()
export class DestinosApiClient {
  destinos: DestinoViaje[];
  constructor(
    private store: Store<AppState>,
    @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
    private http: HttpClient
  ) {
    this.destinos = [];
    this.store
      .select(state => state.destinos)
      .subscribe((data) => {
        return this.destinos = data.items;
    });
  }
  add(destino:DestinoViaje) {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest(
      'POST',
      this.config.apiEndpoint + '/destinations',
      {title:destino.title, subtitle:destino.subtitle, imgUrl:destino.imgUrl},
      { headers: headers }
    );
    this.http.request(req).subscribe((data: HttpResponse<{}>|any) => {
      if (data.status === 201) {
        this.store.dispatch(destinosViajesActions.NuevoDestinoAction({destino:data.body}));
        const myDb = db;
        myDb.destinos?.add(data.body);
        console.log('todos los destinos de la db!');
        myDb.destinos?.toArray().then(destinos => console.log(destinos))
      }
    });

  }
  getAll(): DestinoViaje[] {
    return this.destinos;
  }
  getById(id: string|null): DestinoViaje {
    return this.destinos.filter((destino) => {
      return destino._id == id;
    })[0];
  };

  elegir(destino: DestinoViaje):void {
    this.store.dispatch(destinosViajesActions.ElegidoFavoritoAction({destino:{...destino}}));
  };
}
