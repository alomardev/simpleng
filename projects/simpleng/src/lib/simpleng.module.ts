import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SNGPaginationComponent, SNG_DEFAULT_PAGINATION_CONFIG } from './pagination/pagination.component';
import { SNGConfigs, SNGDefaultConfigs } from './simpleng.common';
import { SNGTableColumnComponent } from './table/column/table-column.component';
import { SNGTableHeaderDirective } from './table/column/table-header.directive';
import { SNGTableRowDirective } from './table/column/table-row.directive';
import { SNGTableHeaderOutletDirective } from './table/table-header-outlet.directive';
import { SNGTableComponent, SNG_DEFAULT_TABLE_CONFIG } from './table/table.component';
import { SNGAlertComponent, SNG_DEFAULT_ALERT_CONFIG } from './alert/alert.component';
import { SNGAlertService } from './alert/alert.service';

@NgModule({
  declarations: [
    SNGTableComponent,
    SNGTableColumnComponent,
    SNGTableHeaderDirective,
    SNGTableRowDirective,
    SNGPaginationComponent,
    SNGTableHeaderOutletDirective,
    SNGAlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
  ],
  exports: [
    SNGTableComponent,
    SNGTableColumnComponent,
    SNGTableHeaderDirective,
    SNGTableRowDirective,
    SNGPaginationComponent,
    SNGAlertComponent
  ],
  providers: [
    SNGAlertService,
    {provide: SNG_DEFAULT_TABLE_CONFIG, useValue: SNGDefaultConfigs.table},
    {provide: SNG_DEFAULT_PAGINATION_CONFIG, useValue: SNGDefaultConfigs.pagination},
    {provide: SNG_DEFAULT_ALERT_CONFIG, useValue: SNGDefaultConfigs.alert},
  ]
})
export class SimpleNGModule {
  static configure(configs: SNGConfigs): ModuleWithProviders {
    return {
      ngModule: SimpleNGModule,
      providers: [
        {provide: SNG_DEFAULT_TABLE_CONFIG, useValue: configs.table},
        {provide: SNG_DEFAULT_PAGINATION_CONFIG, useValue: configs.pagination},
        {provide: SNG_DEFAULT_ALERT_CONFIG, useValue: configs.alert},
      ]
    };
  }
}
