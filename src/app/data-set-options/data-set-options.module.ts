import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { DataSetOptionsComponent } from './data-set-options.component';
import { RegionsOptionsComponent } from './regions-options.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatListModule, MatFormFieldModule, MatSelectModule],
  declarations: [
    DataSetOptionsComponent,
    RegionsOptionsComponent
  ],
  exports: [
    DataSetOptionsComponent,
    RegionsOptionsComponent
  ]
})
export class DataSetOptionsModule {}
