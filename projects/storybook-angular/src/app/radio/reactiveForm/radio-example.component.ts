/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @title Reactive form radios
 */
@Component({
  selector: 'bao-radio-button-reactive-form-example',
  templateUrl: './radio-example.component.html'
})
export class BaoRadioReactiveFormExampleComponent {
  public cars: FormGroup;
  public message: string;

  constructor(fb: FormBuilder) {
    this.cars = fb.group({
      car: ['', Validators.required]
    });
  }

  public onSubmit() {
    this.message = this.cars.valid
      ? 'Le formulaire a été envoyé avec succès'
      : 'Le champ Choisir une voiture est obligatoire';
  }
}
