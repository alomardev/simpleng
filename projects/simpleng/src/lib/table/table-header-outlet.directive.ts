import { Directive, ViewContainerRef, ElementRef } from '@angular/core';

@Directive({
    selector: '[sngTableHeaderOutlet]',
})
export class SNGTableHeaderOutletDirective {
    constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) { }
}
