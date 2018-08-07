import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewComponent } from './map-view.component';

describe('MapViewComponent', () => {
  let component: MapViewComponent;
  let fixture: ComponentFixture<MapViewComponent>;
  let renderSpy: jest.Mock<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ MapViewComponent ]
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(MapViewComponent);
    component = fixture.componentInstance;
    renderSpy = jest.spyOn(component, 'renderHighmap').mockImplementation();
    component.dataPoints = _data;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('produces an array of states based on the regions', () => {
    const result = component.getStates(_regions);

    expect(result).toMatchSnapshot();
  });

  describe('on change', () => {
    it('formats the data and calls render', () => {
      component.ngOnChanges();

      expect(renderSpy).toHaveBeenCalled();
      expect(renderSpy).toMatchSnapshot();
    });

    it('filters the data', () => {
      const spy = jest.spyOn(component, 'getStates');

      component.selectedRegions = _regions;
      component.ngOnChanges();

      expect(spy).toHaveBeenCalled();
      expect(spy).toMatchSnapshot();
    });

    it('filters the data based on the regions', () => {
      component.selectedRegions = _regions;
      component.ngOnChanges();

      expect(renderSpy).toHaveBeenCalled();
      expect(renderSpy).toMatchSnapshot();
    });

    it('destroys the map, if it exists', () => {
      const spy = jest.fn();

      component.map = {
        destroy: spy
      };
      component.ngOnChanges();

      expect(spy).toHaveBeenCalled();
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

const _data = {
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
