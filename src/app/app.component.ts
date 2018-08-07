import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { filter, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { DataSeriesService } from './data-series.service';
import { DataPoints } from './data-set.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Regions } from './regions.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public dataSets$;

  public chosenDataSet$;

  public regions$;

  public concept: string = null;

  public title: string = null;

  public mapData: DataPoints = null;

  public selectedRegions: Regions[];


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

  public changeDataSet(dataSetId) {
    this.chosenDataSetId.next(dataSetId);
  }

  public changeViewDate(date: number) {
    throw new Error('Missing Logic');
  }

  public changeRegions(values: Regions[]) {
    throw new Error('Missing Logic');
  }
}
