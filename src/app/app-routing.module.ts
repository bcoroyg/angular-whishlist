import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinosComponent },
  { path: 'destino', component: DestinoDetalleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
