import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[sngTableRow]'
})
export class SNGTableRowDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
