import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, timer, Observable } from 'rxjs';
import { filter, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { DataSeriesService } from './data-series.service';
import { DataPoints } from './data-set.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Regions } from './regions.model';
import { DataSetOption } from './data-set-option.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /**
   * Observable list of data sets used in UI.
   *
   * @type {Observable<Map<number, DataSetOption>>}
   * @memberof AppComponent
   */
  public dataSets$: Observable<Map<number, DataSetOption>>;

  /**
   * Observable of the selected data set, used in UI.
   *
   * @type {Observable<DataSet>}
   * @memberof AppComponent
   */
  public chosenDataSet$: Observable<DataSet>;

  /**
   * Observable list regions, used in UI.
   *
   * @type {Observable<Regions>}
   * @memberof AppComponent
   */
  public regions$: Observable<Regions[]>;

  /**
   * The variable Id from the data set.
   *
   * @type {string}
   * @memberof AppComponent
   */
  public concept: string = null;

  /**
   * The variable title from the data set.
   *
   * @type {string}
   * @memberof AppComponent
   */
  public title: string = null;

  /**
   * The parsed data used for building the map.
   *
   * @type {DataPoints}
   * @memberof AppComponent
   */
  public mapData: DataPoints = null;

  /**
   * The regions to display data for.
   *
   * @type {Regions[]}
   * @memberof AppComponent
   */
  public selectedRegions: Regions[];

  /**
   * Behavior subject of the chosen data set Id. Changes on
   * every change of the data set Id.
   *
   * @private
   * @memberof AppComponent
   */
  private chosenDataSetId = new BehaviorSubject<number>(-1);

  /**
   * Sets of datapoints mapped to the date integers
   *
   * @memberof AppComponent
   */
  private dataPoints = new Map<number, DataPoints>();

  constructor(
    private dataSeriesService: DataSeriesService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'map',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/img/map.svg'));
  }

  /**
   * Event handle called on initialization of the component.
   *
   * @memberof AppComponent
   */
  public ngOnInit() {
    this.regions$ = this.dataSeriesService.getRegions();

    // uncomment once data-series-.service is working
    //this.dataSets$ = timer(3000).pipe(switchMapTo(this.dataSeriesService.getDataSets()));
    this.chosenDataSet$ = this.chosenDataSetId.pipe(
      filter(id => id !== -1),
      switchMap(id => this.dataSeriesService.getDataSet(id)),
      tap(dataSet => {
        this.dataPoints.clear();
        this.concept = dataSet.concept;
        this.title = dataSet.description;
        dataSet.data.forEach(dataPoint => {
          this.dataPoints.set(dataPoint.period, dataPoint);
        });
      })
    );
  }

  /**
   * Event handler for when the selected data set changes.
   *
   * @param {*} dataSetId
   * @memberof AppComponent
   */
  public changeDataSet(dataSetId) {
    this.chosenDataSetId.next(dataSetId);
  }

  /**
   * Event handler for when the selected date changes.
   *
   * @param {number} date
   * @memberof AppComponent
   */
  public changeViewDate(date: number) {
    throw new Error('Missing Logic');
  }

  /**
   * Event handler for when the selected region changes.
   *
   * @param {Regions[]} values
   * @memberof AppComponent
   */
  public changeRegions(values: Regions[]) {
    throw new Error('Missing Logic');
  }
}
