import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { APP_CONFIG_VALUE } from '../app.config';
import * as destinosViajesActions from '../store/destinos-viajes/destinos-viajes.action'

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private store: Store<AppState>, private http: HttpClient) { }

  intializeDestinosViajesState(){
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/destinations', { headers: headers });
    this.http.request(req).subscribe((data:HttpResponse<{}>|any)=> {
      if (data.status === 200) {
        return this.store.dispatch(destinosViajesActions.LoadDataAction({destinos:data.body}));
      }
    })

  }
}
