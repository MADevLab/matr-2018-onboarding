import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule, MatProgressBar } from '@angular/material/progress-bar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { of, Observable, timer } from 'rxjs';
import { By } from '@angular/platform-browser';

import { DataSetOptionsModule } from './data-set-options/data-set-options.module';
import { MapViewModule } from './map-view/map-view.module';

import { AppComponent } from './app.component';
import { DataSeriesService } from './data-series.service';
import { DataSetOptionsComponent } from './data-set-options/data-set-options.component';
import { DataSetOption } from './data-set-option.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let regionsMock: jest.Mock<any>;
  let dataSetMock: jest.Mock<any>;
  let dataSetsSpy: jest.SpyInstance;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        NoopAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressBarModule,
        MatIconModule,
        DataSetOptionsModule,
        MapViewModule
      ],
      declarations: [AppComponent]
    });
    TestBed.compileComponents();

    const sanitizer = TestBed.get(DomSanitizer) as DomSanitizer;
    const iconRegistry = TestBed.get(MatIconRegistry) as MatIconRegistry;

    // mock icon to ignore warnings about not finding a map icon
    iconRegistry
      .addSvgIconLiteral('map', sanitizer.bypassSecurityTrustHtml('<svg><path id="map" name="map"></path</svg>'));

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    const service = TestBed.get(DataSeriesService) as DataSeriesService;

    regionsMock = jest.spyOn(service, 'getRegions').mockReturnValue(of(_regions));
    dataSetMock = jest.spyOn(service, 'getDataSet').mockReturnValue(of(_dataSet));
    dataSetsSpy = jest.spyOn(service, 'getDataSets');
  });

  it('is defined', () => {
    expect(component).toBeDefined();
  });

  it('allows changing the selected region', () => {
    component.changeRegions(_regions);

    expect(component.selectedRegions).toBe(_regions);
  });

  describe('on init', () => {
    it('gets the regions data', () => {
      component.ngOnInit();

      expect(regionsMock).toHaveBeenCalled();
    });

    it('gets the dataSets', async () => {
      component.ngOnInit();

      await timer(3010);

      expect(dataSetsSpy).toHaveBeenCalled();
    });
  });

  describe('when selecting the dataset', () => {
    let _subscription;

    beforeEach(async () => {
      component.ngOnInit();

      // observable will not fire, unless something is subscribing
      _subscription = component.chosenDataSet$.subscribe(o => {});

      component.changeDataSet(1);
    });

    afterEach(() => {
      _subscription.unsubscribe();
    });

    it('sets the concept', () => {
      expect(component.concept).toBeDefined();
      expect(component.concept).toMatchSnapshot();
    });

    it('sets the title', () => {
      expect(component.title).toBeDefined();
      expect(component.title).toMatchSnapshot();
    });

    it('gets the dataset data', () => {
      expect(dataSetMock).toHaveBeenCalled();
    });
  });

  describe('when changing the view date', () => {
    let _subscription;

    beforeEach(async () => {
      component.ngOnInit();

      await timer(3010);

      // observable will not fire, unless something is subscribing
      _subscription = component.chosenDataSet$.subscribe(o => {});

      component.changeDataSet(1);
    });

    afterEach(() => {
      _subscription.unsubscribe();
    });

    it('throws an error if the date is out of range', () => {
      let err = false;

      try {
        component.changeViewDate(700);
      } catch (e) {
        err = true;
      }

      expect(err).toBeTruthy();
    });

    it('returns the data for the date', () => {
      component.changeViewDate(662);

      expect(component.mapData).toMatchSnapshot();
    });
  });

  describe('the ui, before loading the datasets', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      await fixture.whenRenderingDone();
    });

    it('displays a progress bar', () => {
      const el = fixture.debugElement.query(By.css('mat-progress-bar'));

      expect(el).toBeTruthy();
    });

    it('does not display data set options', () => {
      const el = fixture.debugElement.query(By.css('app-data-set-options'));

      expect(el).toBeFalsy();
    });

    it('does not display regions options', () => {
      const el = fixture.debugElement.query(By.css('app-regions-options'));

      expect(el).toBeFalsy();
    });

    it('does not display a map view', () => {
      const el = fixture.debugElement.query(By.css('app-map-view'));

      expect(el).toBeFalsy();
    });
  });

  describe('the ui, after loading the datasets', () => {
    beforeEach(async () => {
      component.ngOnInit = jest.fn();

      const dataSets = new Map<number, DataSetOption>();
      dataSets.set(0, {
        label: 'home sales',
        dataUrl: 'home-sales.json'
      });
      component.dataSets$ = of(dataSets);

      fixture.detectChanges();
      await fixture.whenRenderingDone();
      await fixture.whenStable();
    });

    it('does not display a progress bar', () => {
      const el = fixture.debugElement.query(By.css('mat-progress-bar'));

      expect(el).toBeFalsy();
    });

    it('displays data set options', () => {
      const el = fixture.debugElement.query(By.css('app-data-set-options'));

      expect(el).toBeTruthy();
    });

    it('displays regions options', () => {
      const el = fixture.debugElement.query(By.css('app-regions-options'));

      expect(el).toBeTruthy();
    });

    it('does not a map view, if map data has not been loaded', () => {
      const el = fixture.debugElement.query(By.css('app-map-view'));

      expect(el).toBeFalsy();
    });

    it('displays a map view, if map data has been loaded', async () => {
      component.mapData = _mapData;
      fixture.detectChanges();
      await fixture.whenRenderingDone();
      await fixture.whenStable();

      const el = fixture.debugElement.query(By.css('app-map-view'));

      expect(el).toBeTruthy();
    });
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

const _mapData = {
  period: 661,
  date: '2015Q1',
  mapData: [
    { value: 18.1, code: 'ak' },
    { value: 84.58, code: 'al' },
    { value: 44.47, code: 'ar' },
    { value: 112.52, code: 'az' },
    { value: 375.38, code: 'ca' },
    { value: 101.97, code: 'co' },
    { value: 35.69, code: 'ct' },
    { value: 6.36, code: 'dc' },
    { value: 9.6, code: 'de' },
    { value: 435.75, code: 'fl' },
    { value: 142.13, code: 'ga' },
    { value: 16.38, code: 'hi' },
    { value: 53.2, code: 'ia' },
    { value: 36.03, code: 'id' },
    { value: 185.43, code: 'il' },
    { value: 118.85, code: 'in' },
    { value: 38.62, code: 'ks' },
    { value: 62.43, code: 'ky' },
    { value: 55.09, code: 'la' },
    { value: 71.14, code: 'ma' },
    { value: 70.91, code: 'md' },
    { value: 16.34, code: 'me' },
    { value: 156.56, code: 'mi' },
    { value: 86, code: 'mn' },
    { value: 97.64, code: 'mo' },
    { value: 39.08, code: 'ms' },
    { value: 16.16, code: 'mt' },
    { value: 134.4, code: 'nc' },
    { value: 12.5, 'code': 'nd' },
    { value: 33.42, code: 'ne' },
    { value: 18.34, code: 'nh' },
    { value: 89.13, code: 'nj' },
    { value: 24.98, code: 'nm' },
    { value: 65.87, code: 'nv' },
    { value: 143.63, code: 'ny' },
    { value: 223.17, code: 'oh' },
    { value: 62.36, code: 'ok' },
    { value: 62.43, code: 'or' },
    { value: 141.63, code: 'pa' },
    { value: 11.17, code: 'ri' },
    { value: 77.15, code: 'sc' },
    { value: 5.16, code: 'sd' },
    { value: 110.86, code: 'tn' },
    { value: 399.95, code: 'tx' },
    { value: 54.35, code: 'ut' },
    { value: 106.38, code: 'va' },
    { value: 9.6, code: 'vt' },
    { value: 103.66, code: 'wa' },
    { value: 86.11, code: 'wi' },
    { value: 25.16, code: 'wv' },
    { value: 8.84, code: 'wy' }
  ]
};
