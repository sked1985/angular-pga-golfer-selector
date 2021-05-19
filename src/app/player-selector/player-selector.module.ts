import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerSelectorRoutingModule } from './player-selector-routing.module';
import { PlayerSelectorComponent } from './player-selector.component';


@NgModule({
  declarations: [PlayerSelectorComponent],
  imports: [
    CommonModule,
    PlayerSelectorRoutingModule
  ]
})
export class PlayerSelectorModule { }
