import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';

class DestinosApiClientViejo {
  getById(id: String): DestinoViaje {
    console.log('llamando por la clase vieja!');
    return {};
  }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers:[DestinosApiClient, {provide: DestinosApiClientViejo, useExisting: DestinosApiClient}],
})
export class DestinoDetalleComponent implements OnInit {

  destino:DestinoViaje={};

  constructor(private route: ActivatedRoute, private destinosApiClient:DestinosApiClientViejo) { }

  ngOnInit(): void {
    //console.log(this.route.snapshot.params['id'])
    //console.log(this.route.snapshot.paramMap.get('id'))
    let id = this.route.snapshot.paramMap.get('id');
    //this.destino = this.destinosApiClient.getById(id);
  }

}
