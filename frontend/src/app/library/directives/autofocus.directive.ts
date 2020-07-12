import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[autofocus]',
})
export class AutofocusDirective implements OnInit {
  @Input('autofocus') isActive: boolean;

  constructor(private elRef: ElementRef<HTMLElement>) {
    if (!this.elRef.nativeElement['focus']) {
      throw new Error('Directive "autofocus" is being used on an unfocusable element');
    }
  }

  ngOnInit(): void {
    if (this.isActive) {
      this.elRef.nativeElement.focus();
    }
  }
}
