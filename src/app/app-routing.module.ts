import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'playerselector',
    loadChildren: () => import('./player-selector/player-selector.module').then(m => m.PlayerSelectorModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'playerselector'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
