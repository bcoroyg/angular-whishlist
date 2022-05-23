import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { reducers, reducersInitialState } from './store';
import { DestinosViajesEffects } from './store/destinos-viajes/destinos-viajes.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { UsuarioLogueadGuard } from './core/guards/usuario-logueado/usuario-loguead.guard';
import { AuthService } from './services/auth.service';
import { VuelosComponent } from './components/vuelos/vuelos/vuelos.component';
import { VuelosMainComponent } from './components/vuelos/vuelos-main/vuelos-main.component';
import { VuelosMasInfoComponent } from './components/vuelos/vuelos-mas-info/vuelos-mas-info.component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalle/vuelos-detalle.component';
import { ReservasModule } from './reservas/reservas.module';
import { APP_CONFIG, APP_CONFIG_VALUE } from './app.config';
import { DestinationService} from './services/destination.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatabaseIndexedDBService, db } from './services/database-indexed-db.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {from, mergeMap, Observable } from 'rxjs';

export const init_app = (destinationService: DestinationService) => {
  return () => destinationService.intializeDestinosViajesState();
}

export class Translation {
  constructor(public id: number, public lang: string, public key: string, public value: string) {}
}

export class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any>{

    const promise = db.translations?.where('lang')
      .equals(lang)
      .toArray()
      .then(results => {
        if (results.length === 0) {
          return this.http
            .get<Translation[]>(APP_CONFIG_VALUE.apiEndpoint + '/destinations/translation?lang=' + lang).subscribe(apiResults => {
              console.log("Soy api Results: ",apiResults)
              db.translations?.bulkAdd(apiResults as any);
              return apiResults
            });
        }
        console.log("Resultas", results)
        return results;
      }).then((traducciones) => {
        console.log('traducciones cargadas:');
        console.log(traducciones);
        return traducciones;
      }).then((traducciones:any) => {
        return traducciones.map((t:any) => ({ [t.key]: t.value}));
      });
    return from(promise as any).pipe(mergeMap((elems) => from(elems as any)));
  }
}

function HttpLoaderFactory(http: HttpClient) {
  return new TranslationLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponent,
    VuelosMainComponent,
    VuelosMasInfoComponent,
    VuelosDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    AuthService,
    UsuarioLogueadGuard,
    {
      provide:APP_CONFIG, useValue: APP_CONFIG_VALUE
    },
    DestinationService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [DestinationService], multi: true },
    DatabaseIndexedDBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
