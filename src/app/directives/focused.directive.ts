import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFocused]',
})
export class FocusedDirective {
  @Input()
  set appFocused(value: boolean) {
    if (value) {
      this.renderer
        .selectRootElement(this.elementRef.nativeElement, true)
        ?.scrollIntoView({ block: 'nearest' });
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
