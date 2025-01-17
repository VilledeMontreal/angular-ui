/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Component } from '@angular/core';

@Component({
  template: ` <bao-avatar [title]="title"></bao-avatar> `
})
export class TestAvatarIconHostComponent {
  title: string;
}

@Component({
  template: `
    <bao-avatar [color]="color" [title]="title">
      <span bao-avatar-content>aaaa</span>
    </bao-avatar>
  `
})
export class TestAvatarTextHostComponent {
  color: string;
  title: string;
}

@Component({
  template: `
    <bao-avatar [title]="title">
      <img bao-avatar-content src="https://picsum.photos/768/768?image=1074" />
    </bao-avatar>
  `
})
export class TestAvatarImageHostComponent {
  title: string;
}
