/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoAvatarComponent, BaoAvatarContent } from './avatar.component';

const AVATAR_DIRECTIVES = [BaoAvatarComponent, BaoAvatarContent];

@NgModule({
  imports: [CommonModule],
  declarations: [AVATAR_DIRECTIVES],
  exports: [AVATAR_DIRECTIVES]
})
export class BaoAvatarModule {}
