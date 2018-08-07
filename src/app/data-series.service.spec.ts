import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { DataSeriesService } from './data-series.service';
import { DataSet } from './data-set.model';
import { DataSetOption } from './data-set-option.model';
import { Regions } from './regions.model';

describe('DataSeriesService', () => {
  let service: DataSeriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataSeriesService]
    });

    service = TestBed.get(DataSeriesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('is defined', () => {
    expect(service).toBeDefined();
  });

  it('gets the list of data sets', () => {
    let dataSets: Map<number, DataSetOption>;
    const sub = service.getDataSets().subscribe(ds => dataSets = ds);

    sub.unsubscribe();

    expect(dataSets).toMatchSnapshot();
  });

  it('gets the regions', () => {
    let regions: Regions[];
    const sub = service.getRegions().subscribe(r => regions = r);
    const req = httpMock.expectOne('assets/regions.json');

    expect(req.request.method).toBe('GET');
    req.flush(_regions);

    expect(regions).toMatchSnapshot();
  });

  it('gets a data set', () => {
    let dataSet: DataSet;
    const sub = service.getDataSet(1).subscribe(d => dataSet = d);
    const req = httpMock.expectOne(`${service.s3Url}/gross-domestic-product.json`);

    expect(req.request.method).toBe('GET');
    req.flush(_dataSet);

    expect(dataSet).toMatchSnapshot();
  });
});

const _regions = [
  {
    id: 'NE',
    title: 'Northeast',
    regions: ['CT', 'DC', 'DE']
  },
  {
    id: 'MW',
    title: 'Midwest',
    regions: ['WI']
  },
  {
    id: 'SO',
    title: 'South',
    regions: ['AL', 'AR']
  },
  {
    id: 'WE',
    title: 'West',
    regions: ['WA', 'WY']
  }
];

const _dataSet = {
  concept: 'FGDP$',
  description: 'Gross State Product: Total, (Bil. Chained 2009 $, SAAR)',
  source: 'U.S. Bureau of Economic Analysis (BEA); Moody\'s Analytics Estimated and Forecasted',
  freq: 162,
  transformation: 'None',
  data: [
    {
      period: 661,
      date: '2015Q1',
      mapData: [
        {
          value: 49.29,
          code: 'ak'
        },
        {
          value: 177.56,
          code: 'al'
        },
        {
          value: 107.06,
          code: 'ar'
        },
        {
          value: 263.13,
          code: 'az'
        },
        {
          value: 2226.61,
          code: 'ca'
        },
        {
          value: 286.63,
          code: 'co'
        },
        {
          value: 225.09,
          code: 'ct'
        }
      ]
    },
    {
      period: 662,
      date: '2015Q2',
      mapData: [
        {
          value: 49.29,
          code: 'ak'
        },
        {
          value: 177.56,
          code: 'al'
        },
        {
          value: 107.06,
          code: 'ar'
        },
        {
          value: 263.13,
          code: 'az'
        },
        {
          value: 2226.61,
          code: 'ca'
        },
        {
          value: 286.63,
          code: 'co'
        },
        {
          value: 225.09,
          code: 'ct'
        }
      ]
    },
    {
      period: 664,
      date: '2015Q4',
      mapData: [
        {
          value: 49.29,
          code: 'ak'
        },
        {
          value: 177.56,
          code: 'al'
        },
        {
          value: 107.06,
          code: 'ar'
        },
        {
          value: 263.13,
          code: 'az'
        },
        {
          value: 2226.61,
          code: 'ca'
        },
        {
          value: 286.63,
          code: 'co'
        },
        {
          value: 225.09,
          code: 'ct'
        }
      ]
    },
    {
      period: 663,
      date: '2015Q3',
      mapData: [
        {
          value: 49.29,
          code: 'ak'
        },
        {
          value: 177.56,
          code: 'al'
        },
        {
          value: 107.06,
          code: 'ar'
        },
        {
          value: 263.13,
          code: 'az'
        },
        {
          value: 2226.61,
          code: 'ca'
        },
        {
          value: 286.63,
          code: 'co'
        },
        {
          value: 225.09,
          code: 'ct'
        }
      ]
    },
    {
      period: 665,
      date: '2016Q1',
      mapData: [
        {
          value: 49.29,
          code: 'ak'
        },
        {
          value: 177.56,
          code: 'al'
        },
        {
          value: 107.06,
          code: 'ar'
        },
        {
          value: 263.13,
          code: 'az'
        },
        {
          value: 2226.61,
          code: 'ca'
        },
        {
          value: 286.63,
          code: 'co'
        },
        {
          value: 225.09,
          code: 'ct'
        }
      ]
    },
    {
      period: 666,
      date: '2016Q2',
      mapData: [
        {
          value: 49.29,
          code: 'ak'
        },
        {
          value: 177.56,
          code: 'al'
        },
        {
          value: 107.06,
          code: 'ar'
        },
        {
          value: 263.13,
          code: 'az'
        },
        {
          value: 2226.61,
          code: 'ca'
        },
        {
          value: 286.63,
          code: 'co'
        },
        {
          value: 225.09,
          code: 'ct'
        }
      ]
    }
  ]
};
