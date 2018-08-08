import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Regions } from '../regions.model';

@Component({
  selector: 'app-regions-options',
  templateUrl: './regions-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegionsOptionsComponent {

  /**
   * The available regions to display.
   *
   * @type {Regions[]}
   * @memberof RegionsOptionsComponent
   */
  @Input() public regions: Regions[];

  /**
   * Event emitter that emits when the list of selected regions change.
   *
   * @memberof RegionsOptionsComponent
   */
  @Output() public changeRegions = new EventEmitter<Regions[]>();

  /**
   * Region input reactive form control.
   *
   * @memberof RegionsOptionsComponent
   */
  public regionControl = new FormControl();

  /**
   * Event handler for when the available regions is changed in the UI.
   *
   * @param {string[]} ids
   * @memberof RegionsOptionsComponent
   */
  public onRegionsChange(ids: string[]) {
    throw new Error('Missing Logic');
  }
}
