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
  @Input() public dataSets: Map<number, DataSetOption>;

  @Output() public changeSet = new EventEmitter<DataSet>();

  @Input() public chosenSet: DataSet;

  @Output() public changeDate = new EventEmitter<number>();

  public dataSetControl = new FormControl({value: -1}, Validators.min(0));

  public dateControl = new FormControl({value: -1, disabled: true}, Validators.min(0));

  public dataSetOptions: OptionEntry[];

  public dateOptions: OptionEntry[];

  public ngOnChanges(changes: SimpleChanges) {
    this.dateOptions = [];

    if (changes.dataSets) {
      this.onDataSetsChange();
    }

    if (changes.chosenSet && this.chosenSet) {
      this.onDataSetSelected();
    }
  }

  public onDataSetsChange() {
    throw new Error('Missing Logic');
  }

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

  private mapDataPoint = (dataPoint: DataPoints) => {
    return {
      value: dataPoint.period,
      label: dataPoint.date
    };
  }

  private sortDateOptions = (a: OptionEntry, b: OptionEntry) => {
    if (a.value > b.value) {
      return 1;
    } else if (a.value < b.value) {
      return -1;
    }

    return 0;
  }
}

interface OptionEntry {
  value: number;
  label: string;
}
