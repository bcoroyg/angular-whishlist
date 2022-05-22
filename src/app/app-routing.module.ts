import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { UsuarioLogueadGuard } from './core/guards/usuario-logueado/usuario-loguead.guard';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
