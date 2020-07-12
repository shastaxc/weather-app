import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AutofocusDirective],
  exports: [AutofocusDirective],
})
export class AutofocusModule {}
