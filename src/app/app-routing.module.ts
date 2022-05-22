import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalle/vuelos-detalle.component';
import { VuelosMainComponent } from './components/vuelos/vuelos-main/vuelos-main.component';
import { VuelosMasInfoComponent } from './components/vuelos/vuelos-mas-info/vuelos-mas-info.component';
import { VuelosComponent } from './components/vuelos/vuelos/vuelos.component';
import { UsuarioLogueadGuard } from './core/guards/usuario-logueado/usuario-loguead.guard';


export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMainComponent },
  { path: 'mas-info', component: VuelosMasInfoComponent },
  { path: ':id', component: VuelosDetalleComponent },
];

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinosComponent },
  { path: 'destino/:id', component: DestinoDetalleComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ UsuarioLogueadGuard ]
  },
  {
    path: 'vuelos',
    component: VuelosComponent,
    canActivate: [ UsuarioLogueadGuard ],
    children: childrenRoutesVuelos
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
