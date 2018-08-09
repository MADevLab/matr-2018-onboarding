import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataSetOption } from '../data-set-option.model';
import { DataPoints, DataSet } from '../data-set.model';

@Component({
  selector: 'app-data-set-options',
  templateUrl: './data-set-options.component.html',
  styleUrls: ['./data-set-options.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataSetOptionsComponent implements OnChanges {

  /**
   * The list of data sets to be displayed.
   *
   * @type {Map<number, DataSetOption>}
   * @memberof DataSetOptionsComponent
   */
  @Input() public dataSets: Map<number, DataSetOption>;

  /**
   * Event emitter that emits when the data set to display changes.
   *
   * @memberof DataSetOptionsComponent
   */
  @Output() public changeSet = new EventEmitter<DataSet>();

  /**
   * The user selected data set.
   *
   * @type {DataSet}
   * @memberof DataSetOptionsComponent
   */
  @Input() public chosenSet: DataSet;

  /**
   * Event emitter that emits an event when the selected date is changed in UI.
   *
   * @memberof DataSetOptionsComponent
   */
  @Output() public changeDate = new EventEmitter<number>();

  /**
   * Reactive form control for the data set option.
   *
   * @memberof DataSetOptionsComponent
   */
  public dataSetControl = new FormControl({value: -1}, Validators.min(0));

  /**
   * Reactive form control for that date option.
   *
   * @memberof DataSetOptionsComponent
   */
  public dateControl = new FormControl({value: -1, disabled: true}, Validators.min(0));

  /**
   * Formatted data set options, used when displaying the list of data sets in the UI.
   *
   * @type {OptionEntry[]}
   * @memberof DataSetOptionsComponent
   */
  public dataSetOptions: OptionEntry[];

  /**
   * Formatted date options, used when displaying the list of dates in the UI.
   *
   * @type {OptionEntry[]}
   * @memberof DataSetOptionsComponent
   */
  public dateOptions: OptionEntry[];

  /**
   * Event handler for when any data-bounded property changes on the component.
   *
   * @param {SimpleChanges} changes
   * @memberof DataSetOptionsComponent
   */
  public ngOnChanges(changes: SimpleChanges) {
    this.dateOptions = [];

    if (changes.dataSets) {
      this.onDataSetsChange();
    }

    if (changes.chosenSet && this.chosenSet) {
      this.onDataSetSelected();
    }
  }

  /**
   * Event handler, triggered when the list of data sets changes.
   *
   * @memberof DataSetOptionsComponent
   */
  public onDataSetsChange() {
    throw new Error('Missing Logic');
  }

  /**
   * Event handler, triggered when the selected data set changes.
   *
   * @memberof DataSetOptionsComponent
   */
  public onDataSetSelected() {
    this.dateControl.enable();
    this.dateOptions = this.chosenSet.data
      .map(this.mapDataPoint)
      .sort(this.sortDateOptions);

    // make sure the listener knows this date exists for the set chosen
    if (this.dateControl.value !== -1 && this.dateOptions.findIndex(date => date.value === this.dateControl.value) !== -1) {
      throw new Error('Missing Logic');
    } else {
      // or let them know to hold 'em
      throw new Error('Missing Logic');
    }
  }


  /**
   * Converts a DataPoints to an OptionEntry.
   *
   * @private
   * @param {DataPoints} dataPoint
   * @returns {OptionEntry}
   * @memberof DataSetOptionsComponent
   */
  private mapDataPoint(dataPoint: DataPoints): OptionEntry {
    return {
      value: dataPoint.period,
      label: dataPoint.date
    };
  }

  /**
   * Simple sort function.
   *
   * @private
   * @param {OptionEntry} a
   * @param {OptionEntry} b
   * @returns {number}
   * @memberof DataSetOptionsComponent
   */
  private sortDateOptions(a: OptionEntry, b: OptionEntry): number {
    if (a.value > b.value) {
      return 1;
    } else if (a.value < b.value) {
      return -1;
    }

    return 0;
  }
}

interface OptionEntry {

  /**
   * Id/value field.
   *
   * @type {number}
   * @memberof OptionEntry
   */
  value: number;

  /**
   * Text/display field.
   *
   * @type {string}
   * @memberof OptionEntry
   */
  label: string;
}
