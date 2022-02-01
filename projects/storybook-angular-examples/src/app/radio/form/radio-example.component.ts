import { Component } from '@angular/core';

/**
 * @title Basic radioes
 */
@Component({
  selector: 'bao-radio-button-example',
  templateUrl: './radio-example.component.html',
})
export class BaoRadioExampleComponent {
  public animalFavori: string = 'Tortue';
  public animaux: string[] = ['Chien', 'Chat', 'Poisson', 'Tortue'];
}
