import { SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DataSetOptionsComponent } from './data-set-options.component';
import { DataSetOption } from '../data-set-option.model';

describe('DataSetOptionsComponent', () => {
  let component: DataSetOptionsComponent;
  let fixture: ComponentFixture<DataSetOptionsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatListModule,
        MatSelectModule
      ],
      declarations: [ DataSetOptionsComponent ]
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSetOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is defined', () => {
    expect(component).toBeDefined();
  });

  it('html matches the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('by default', () => {
    it('data control is disabled', () => {
      const select = fixture.debugElement.queryAll(By.directive(MatSelect))[1];

      expect(component.dateControl.disabled).toBeTruthy();
      expect(select.attributes['aria-disabled']).toBe('true');
    });
  });

  describe('on changes', () => {
    let _dataSetChangeSpy: jest.SpyInstance<any>;
    let _dataSetSelectSpy: jest.SpyInstance<any>;

    beforeEach(() => {
      _dataSetChangeSpy = jest.spyOn(component, 'onDataSetsChange');
      _dataSetSelectSpy = jest.spyOn(component, 'onDataSetSelected');
    });

    it('resets the dateOptions', () => {
      component.dateOptions = [
        {label: '2010Q1', value: 1},
        {label: '2010Q1', value: 2},
        {label: '2010Q1', value: 3},
        {label: '2010Q1', value: 4}
      ];

      component.ngOnChanges({});

      expect(component.dateOptions).toEqual([]);
    });

    it('calls onDataSetsChange, if change is to dataSets', () => {
      const change = {
        dataSets: new SimpleChange('foo', 'bar', false)
      };

      component.ngOnChanges(change);

      expect(_dataSetChangeSpy).toHaveBeenCalled();
    });

    it('calls onDataSetSelected, if change is to chosenSet', () => {
      const change = {
        chosenSet: new SimpleChange('foo', 'bar', false)
      };

      component.chosenSet = _dataSet1;
      component.ngOnChanges(change);

      expect(_dataSetSelectSpy).toHaveBeenCalled();
    });
  });

  describe('on setting data sets', () => {
    beforeEach(() => {
      component.dataSetOptions = [
        {
          value: 1,
          label: 'Foo'
        },
        {
          value: 2,
          label: 'Bar'
        }
      ];
      component.dataSetControl.setValue(-2);
      component.dateControl.setValue(-2);
      component.dateControl.enable();
    });

    it('empties out the dataSetOptions', () => {
      component.onDataSetsChange();

      expect(component.dataSetOptions).toEqual([]);
    });

    it('sets the dataSetControl value to -1', () => {
      component.onDataSetsChange();

      expect(component.dataSetControl.value).toBe(-1);
    });

    it('sets the dateControl value to -1', () => {
      component.onDataSetsChange();

      expect(component.dateControl.value).toBe(-1);
    });

    it('disables the dateControl', () => {
      component.onDataSetsChange();

      expect(component.dateControl.enabled).toBeFalsy();
    });

    it('pushes the values into dataSetOptions, if dataSets are defined', () => {
      component.dataSets = new Map<number, DataSetOption>();
      component.dataSets.set(0, _dataSetOption1);
      component.dataSets.set(1, _dataSetOption2);
      component.onDataSetsChange();

      expect(component.dataSetOptions).toMatchSnapshot();
    });
  });

  describe('on selection of a data set', () => {
    beforeEach(() => {
      component.dataSets = new Map<number, DataSetOption>();
      component.dataSets.set(0, _dataSetOption1);
      component.dataSets.set(1, _dataSetOption2);
      component.chosenSet = _dataSet1;
      component.onDataSetsChange();
    });

    it('enables the dateControl', () => {
      component.onDataSetSelected();

      expect(component.dateControl.disabled).toBeFalsy();
    });

    it('parses and sorts the dates out of the dataset', () => {
      component.onDataSetSelected();

      expect(component.dateOptions).toMatchSnapshot();
    });

    it('changeDate emits the dateControl value, if the control has a value and that value is in the data set', () => {
      const spy = jest.spyOn(component.changeDate, 'emit');

      component.dateControl.setValue(665);
      component.onDataSetSelected();

      expect(spy).toHaveBeenCalled();
      expect(spy).toMatchSnapshot();
    });

    it('changeDate emits -1 if the dateControl has no value', () => {
      const spy = jest.spyOn(component.changeDate, 'emit');

      component.onDataSetSelected();

      expect(spy).toHaveBeenCalled();
      expect(spy).toMatchSnapshot();
    });

    it('changeDate emits -1 if the dateControl value is not in the dataset', () => {
      const spy = jest.spyOn(component.changeDate, 'emit');

      component.dateControl.setValue(2);
      component.onDataSetSelected();

      expect(spy).toHaveBeenCalled();
      expect(spy).toMatchSnapshot();
    });

    it('if the dateControl value is not in the dataset, it is set to -1', () => {
      component.dateControl.setValue(2);

      const spy = jest.spyOn(component.dateControl, 'setValue');

      component.onDataSetSelected();

      expect(spy).toHaveBeenCalled();
      expect(spy).toMatchSnapshot();
    });
  });
});

const _dataSet1 = {
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

const _dataSet2 = {
  concept: 'FOO',
  description: 'Another DataSet',
  source: 'U.S. Bureau of Economic Analysis (BEA); Moody\'s Analytics Estimated and Forecasted',
  freq: 162,
  transformation: 'None',
  data: [
    {
      period: 681,
      date: '2020Q1',
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
      period: 682,
      date: '2020Q2',
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
      period: 684,
      date: '2020Q4',
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
      period: 683,
      date: '2020Q3',
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
      period: 685,
      date: '2020Q1',
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
      period: 686,
      date: '2021Q2',
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

const _dataSetOption1 = {
  label: 'Foo',
  dataUrl: 'http://localhost/foo'
};

const _dataSetOption2 = {
  label: 'Bar',
  dataUrl: 'http://localhost/bar'
};
