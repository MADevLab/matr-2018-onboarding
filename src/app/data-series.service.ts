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
  public s3Url = 'https://s3-us-west-2.amazonaws.com/ma-cs-matr-2018-onboarding';

  // fallback if s3 is inaccessible. if requests are failing,
  // uncomment this line, and comment out line 12
  //public s3Url = 'assets';

  constructor(private http: HttpClient) {}

  public getDataSets() {
    throw new Error('Missing Logic');
  }

  public getDataSet(dataSetId: number): Observable<DataSet> {
    throw new Error('Missing Logic');

    // uncomment once missing logic is implemented
    // const url = `${this.s3Url}/${dataSets.get(dataSetId).dataUrl}`;

  }

  public getRegions(): Observable<Regions[]> {
    const url = 'assets/regions.json';

    throw new Error('Missing Logic');
  }

  private createDataSets() {
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
