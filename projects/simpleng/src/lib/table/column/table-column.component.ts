import { Component, ContentChild, TemplateRef, AfterViewInit, Input } from '@angular/core';
import { SNGTableHeaderDirective } from './table-header.directive';
import { SNGTableRowDirective } from './table-row.directive';

@Component({
  selector: 'sng-table-column',
  template: '',
})
export class SNGTableColumnComponent {

  @Input() sort: string;
  @ContentChild(SNGTableHeaderDirective, {read: TemplateRef}) headerTemplate: TemplateRef<any>;
  @ContentChild(SNGTableRowDirective, {read: TemplateRef}) rowTemplate: TemplateRef<any>;

  constructor() {}
}
