import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHighlighted]',
  standalone: true,
})
export class HighlightedDirective {
  @Input('highlighted') isHighlighted: boolean;
  constructor() {}

  @HostBinding('class.highlighted')
  get cssClasses() {
    return this.isHighlighted;
  }

  /*   @HostBinding('style.border')
  get borderColor() {
    return '4px solid orange';
  } */
}
