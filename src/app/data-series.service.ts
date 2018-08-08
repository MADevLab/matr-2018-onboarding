import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { DataSetOption } from './data-set-option.model';
import { DataSet } from './data-set.model';
import { Regions } from './regions.model';

@Injectable({
  providedIn: 'root'
})
export class DataSeriesService {

  /**
   * s3 bucket containing dataset json.
   *
   * @memberof DataSeriesService
   */
  public s3Url = 'https://s3-us-west-2.amazonaws.com/ma-cs-matr-2018-onboarding';

  // fallback if s3 is inaccessible. if requests are failing,
  // uncomment this line, and comment out line 12
  //public s3Url = 'assets';

  constructor(private http: HttpClient) {}

  /**
   * Gets the list of available data sets.
   *
   * @returns {Observable<Map<number, DataSetOption>>}
   * @memberof DataSeriesService
   */
  public getDataSets(): Observable<Map<number, DataSetOption>> {
    throw new Error('Missing Logic');
  }

  /**
   * Gets a dataset based on the dataset Id.
   *
   * @param {number} dataSetId
   * @returns {Observable<DataSet>}
   * @memberof DataSeriesService
   */
  public getDataSet(dataSetId: number): Observable<DataSet> {
    throw new Error('Missing Logic');

    // part of the solution
    // const url = `${this.s3Url}/${dataSets.get(dataSetId).dataUrl}`;

  }

  /**
   * Gets the list of available regions.
   *
   * @returns {Observable<Regions[]>}
   * @memberof DataSeriesService
   */
  public getRegions(): Observable<Regions[]> {
    const url = 'assets/regions.json';

    throw new Error('Missing Logic');
  }

  /**
   * Hardcoded list of available data sets.
   *
   * @private
   * @returns {Map<number, DataSetOption>}
   * @memberof DataSeriesService
   */
  private createDataSets(): Map<number, DataSetOption> {
    const dataSets = new Map<number, DataSetOption>();
    dataSets.set(0, {
      label: 'home sales',
      dataUrl: 'home-sales.json'
    });

    dataSets.set(1, {
      label: 'gross domestic product',
      dataUrl: 'gross-domestic-product.json'
    });

    dataSets.set(2, {
      label: 'avg. household income',
      dataUrl: 'avg-household-income.json'
    });

    return dataSets;
  }
}
