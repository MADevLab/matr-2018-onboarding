import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RegionsOptionsComponent } from './regions-options.component';

describe('The RegionsOptionsComponent', () => {
  let component: RegionsOptionsComponent;
  let fixture: ComponentFixture<RegionsOptionsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatSelectModule
      ],
      declarations: [ RegionsOptionsComponent ]
    });

    await TestBed.compileComponents();
    fixture = TestBed.createComponent(RegionsOptionsComponent);
    component = fixture.componentInstance;
  });

  it('is defined', () => {
    expect(component).toBeDefined();
  });

  it('emits changes to the regions', () => {
    const spy = jest.spyOn(component.changeRegions, 'emit');

    component.regions = _regions;
    component.onRegionsChange(['NE', 'SO']);

    expect(spy).toHaveBeenCalled();
    expect(spy).toMatchSnapshot();
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
