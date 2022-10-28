import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[softecHoverCell]',
})
export class HoverCellDirective {
  @HostBinding('style.cursor') cursor: string = 'pointer';
  @HostBinding('class') classes = '';

  @HostListener('mouseover', ['$event'])
  mouseover(event: any) {
    this.classes = 'hover-cell';
  }
  constructor() {}
}
