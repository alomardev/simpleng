import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[sngTableHeader]'
})
export class SNGTableHeaderDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
