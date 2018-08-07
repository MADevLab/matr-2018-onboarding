import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Regions } from '../regions.model';

@Component({
  selector: 'app-regions-options',
  templateUrl: './regions-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegionsOptionsComponent {
  @Input() public regions: Regions[];

  @Output() public changeRegions = new EventEmitter<Regions[]>();

  public regionControl = new FormControl();

  public onRegionsChange(ids: string[]) {
    throw new Error('Missing Logic');
  }
}
