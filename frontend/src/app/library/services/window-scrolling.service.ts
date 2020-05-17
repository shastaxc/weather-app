import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WindowScrollingService {
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  // Disable the scrolling feature on the main viewport.
  disable(): void {
    this.getScrollContainer().classList.add('no-scroll');
  }

  // Re-enable the scrolling feature on the main viewport.
  enable(): void {
    this.getScrollContainer().classList.remove('no-scroll');
  }

  getScrollContainer(): HTMLElement {
    return this.doc.querySelector('.mat-sidenav-container');
  }
}
