import { Component, Inject, Injectable, InjectionToken, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';
import { AppState } from 'src/app/store';

class DestinosApiClientViejo {
  getById(id: string): DestinoViaje {
    console.log('llamando por la clase vieja!');
    return {};
  }
}

interface AppConfig {
  apiEndpoint: string;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
};
const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

@Injectable()
export class DestinosApiClientDecorated extends DestinosApiClient {
  constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>) {
    super(store);
  }
  public override getById(id: string): DestinoViaje {
    console.log('llamando por la clase decorada!');
    console.log('config: ' + this.config.apiEndpoint);
    return super.getById(id);
  }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  //providers:[DestinosApiClient, {provide: DestinosApiClientViejo, useExisting: DestinosApiClient}],
  providers: [
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    { provide: DestinosApiClient, useClass: DestinosApiClientDecorated},
    { provide: DestinosApiClientViejo, useExisting: DestinosApiClient },
  ]
})
export class DestinoDetalleComponent implements OnInit {

  destino:DestinoViaje={};

  constructor(private route: ActivatedRoute, private destinosApiClient:DestinosApiClientViejo) { }

  ngOnInit(): void {
    //console.log(this.route.snapshot.params['id'])
    //console.log(this.route.snapshot.paramMap.get('id'))
    let id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id as string);
  }

}
