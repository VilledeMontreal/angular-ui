/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BaoSnackBarModuleTest } from './snack-bar/module';

@NgModule({
  declarations: [AppComponent],
  imports: [BaoSnackBarModuleTest],
  bootstrap: [AppComponent]
})
export class AppModule {}
