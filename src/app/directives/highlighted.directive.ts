import {
  Directive,
  HostListener,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[appHighlighted]',
  standalone: true,
  exportAs: 'hl',
})
export class HighlightedDirective {
  @Input('highlighted') isHighlighted: boolean;

  @Output() toggleHighlight: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor() {}

  @HostBinding('class.highlighted')
  get cssClasses() {
    return this.isHighlighted;
  }

  /*   @HostBinding('style.border')
  get borderColor() {
    return '4px solid orange';
  } */

  @HostBinding('attr.disabled')
  get disabled() {
    return 'true';
  }

  @HostListener('mouseover')
  onHover() {
    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener('mouseleave')
  onLeave() {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  toggle() {
    this.isHighlighted = !this.isHighlighted;
  }
}
