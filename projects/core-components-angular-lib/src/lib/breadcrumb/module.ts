import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoBreadcrumbComponent } from './breadcrumb.component';

const BREADCRUMB_DIRECTIVES = [BaoBreadcrumbComponent];

@NgModule({
  imports: [CommonModule, ObserversModule],
  declarations: [BREADCRUMB_DIRECTIVES],
  exports: [BREADCRUMB_DIRECTIVES]
})
export class BaoBreadcrumbModule {}
