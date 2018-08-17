import { Component, Input, OnChanges } from '@angular/core';
import { DataPoints, DataPoint } from '../data-set.model';
import { Regions } from '../regions.model';

declare var Highcharts: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html'
})
export class MapViewComponent implements OnChanges {

  /**
   * Datapoints used when rendering the chart.
   *
   * @type {DataPoints}
   * @memberof MapViewComponent
   */
  @Input() public dataPoints: DataPoints;

  /**
   * The title of the chart.
   *
   * @type {string}
   * @memberof MapViewComponent
   */
  @Input() public title: string = null;

  /**
   * The concept/variable Id for display.
   *
   * @type {string}
   * @memberof MapViewComponent
   */
  @Input() public concept: string = null;

  /**
   * The array of regions to display data for. If an empty array,
   * display all regions.
   *
   * @type {Regions[]}
   * @memberof MapViewComponent
   */
  @Input() public selectedRegions: Regions[];

  /**
   * Highmap instance
   *
   * @type {*}
   * @memberof AppComponent
   */
  public map: any;

  constructor() {}

  /**
   * Event handler for when any data-bounded property changes on the component.
   *
   * @memberof MapViewComponent
   */
  ngOnChanges() {
    if (this.map) {
      this.map.destroy();
    }

    const data = this.dataPoints.mapData.map(dp => this.formatMapData(dp));

    // //const regions = this.getStates(this.selectedRegions);

    // if (regions && regions.length) {
    //   // uncomment once data logic is implemented
    //   //data = data.filter(({ code }) => regions.includes(code));
    // }

    // uncomment once data logic is implemented
    this.renderHighmap(data);
  }

  /**
   * Gets the list of states to filter the map for.
   *
   * @param {Regions[]} regions
   * @returns {string[]}
   * @memberof MapViewComponent
   */
  public getStates(regions: Regions[]): string[] {
    throw new Error('Missing Logic');
  }

  /**
   * Creates the map/chart.
   *
   * @param {*} data
   * @memberof MapViewComponent
   */
  public renderHighmap(data: any) {
    const el = document.getElementById('container');

    if (!el) {
      throw new Error('A div with ID of container is required');
    }

    if (typeof Highcharts !== 'undefined') {

      // Instantiate the map
      this.map = Highcharts.mapChart(el, {
        chart: {
          map: 'countries/us/us-all',
          borderWidth: 1
        },

        title: {
          text: this.title
        },

        legend: {
          layout: 'horizontal',
          borderWidth: 0,
          backgroundColor: 'rgba(255,255,255,0.85)',
          floating: true,
          verticalAlign: 'top',
          y: 25
        },

        mapNavigation: {
          enabled: false
        },

        colorAxis: {
          min: null,
          type: 'linear',
          minColor: '#FF5722',
          maxColor: '#00bcd4'
        },

        series: [
          {
            animation: false,
            data: data,
            joinBy: ['postal-code', 'code'],
            dataLabels: {
              enabled: true,
              color: '#FFFFFF',
              format: '{point.code}'
            },
            name: this.concept,
            tooltip: {
              pointFormat: '{point.code}: {point.value}'
            }
          }
        ]
      });
    }
  }

  /**
   * Formats a data point to be readable by HighCharts.
   *
   * @private
   * @memberof MapViewComponent
   */
  private formatMapData = (dataPoint: DataPoint) => {
    return Object.assign({}, dataPoint, { code: dataPoint.code.toUpperCase() });
  }
}
