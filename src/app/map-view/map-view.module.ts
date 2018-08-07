import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from './map-view.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MapViewComponent],
  exports: [MapViewComponent]
})
export class MapViewModule {}
