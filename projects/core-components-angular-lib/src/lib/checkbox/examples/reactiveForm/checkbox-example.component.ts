import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

/**
 * @title Reactive form checkboxes
 */
@Component({
  selector: 'bao-checkbox-reactive-form-example',
  templateUrl: './checkbox-example.component.html',
  styleUrls: ['../../checkbox.component.scss']
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
