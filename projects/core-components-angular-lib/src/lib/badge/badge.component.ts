import { Component, Input } from '@angular/core';

@Component({
  selector: 'bao-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
  host: {
    class: 'badge badge-pill',
    '[class.badge-success]': 'type === "success"',
    '[class.badge-danger]': 'type === "danger"',
    '[class.badge-warning]': 'type === "warning"',
    '[class.badge-info]': 'type === "info"'
  }
})
export class BaoBadgeComponent {
  @Input() public type: '' | 'success' | 'danger' | 'warning' | 'info' = '';
}
