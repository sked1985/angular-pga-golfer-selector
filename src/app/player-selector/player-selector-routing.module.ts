import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerSelectorComponent } from './player-selector.component';


const routes: Routes = [
  { path: '', component: PlayerSelectorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerSelectorRoutingModule { }
