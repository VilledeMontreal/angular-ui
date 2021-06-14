import { Component, Input } from '@angular/core';

@Component({
  selector: 'bao-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  host: {
    class: '',
    '[class.positive]': 'type === "success"',
    '[class.negative]': 'type === "danger"',
    '[class.warning]': 'type === "warning"',
    '[class.informative]': 'type === "info"'
  }
})
export class BaoBadgeComponent {
  @Input() public type: '' | 'success' | 'danger' | 'warning' | 'info' = '';
}
