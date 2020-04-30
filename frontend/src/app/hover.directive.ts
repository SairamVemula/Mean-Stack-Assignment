import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  @HostBinding('class.is-hovering') hovering = false;

  @HostListener('mouseenter') OnMouseEnter() {
    this.hovering = true;
  }

  @HostListener('mouseleave') OnMouseLeave() {
    this.hovering = false;
  }

  constructor() {}
}
