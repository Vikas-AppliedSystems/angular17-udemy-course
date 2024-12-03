import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngxUnless]',
  standalone: true,
})
export class NgxUnlessDirective {
  isVisible: boolean = false;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input()
  set ngxUnless(condition: boolean) {
    if (!condition && !this.isVisible) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.isVisible = true;
    } else if (condition && this.isVisible) {
      this.viewContainerRef.clear();
      this.isVisible = false;
    }
  }
}
