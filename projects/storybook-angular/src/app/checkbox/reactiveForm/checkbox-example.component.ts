/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

/**
 * @title Reactive form checkboxes
 */
@Component({
  selector: 'bao-checkbox-reactive-form-example',
  templateUrl: './checkbox-example.component.html'
})
export class BaoCheckboxReactiveFormExampleComponent {
  public cars: FormGroup;

  constructor(fb: FormBuilder) {
    this.cars = fb.group({
      honda: new FormControl({ value: false, disabled: true }),
      toyota: false,
      mercedes: false,
      kia: true
    });
  }
}
