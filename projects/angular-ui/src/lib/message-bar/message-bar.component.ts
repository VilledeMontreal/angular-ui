/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  ElementRef,
  Directive
} from '@angular/core';

/**
 * The BaoMessageBarContent directive is used within the <bao-message-bar>
 * It ensures consistency in text formatting and spacing.
 *
 * This directive is purely visual and does not provide any additional behaviors.
 */
@Directive({
  selector: 'bao-message-content',
  host: { class: 'bao-message-content' }
})
export class BaoMessageBarContent {}

@Component({
  selector: 'bao-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'bao-message-bar message-bar-dismissible bao-fade-in',
    '[class.bao-message-bar-info]': 'type === "info"',
    '[class.bao-message-bar-alert]': 'type === "alert"',
    '[class.bao-message-bar-urgent]': 'type === "urgent"',
    '[class.bao-message-bar-neutral]': 'type === "neutral"'
  }
})
export class BaoMessageBarComponent implements OnChanges {
  @Input() type: 'info' | 'alert' | 'urgent' | 'neutral' = 'info';
  @Input() dismissible = false;
  @Input() dismissibleButtonAriaLabel = 'Cacher le message';

  @Output() dismiss = new EventEmitter<void>();

  iconType: string;
  iconTitle: string;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.iconType = this.getIconType(changes['type'].currentValue);
      this.iconTitle = this.getIconTitle(changes['type'].currentValue);
    }
  }

  onDismissClicked(): void {
    const messageBar = this.elementRef.nativeElement;
    messageBar.classList.add('bao-fade-out');

    setTimeout(() => {
      this.dismiss.emit();
    }, 300);
  }

  private getIconType(value: string): string {
    const icons = {
      info: 'icon-info',
      alert: 'icon-warning',
      urgent: 'icon-emergency',
      neutral: 'icon-info'
    };
    return (icons[value] as string) || 'icon-info';
  }

  private getIconTitle(value: string): string {
    const titles = {
      info: 'Information',
      alert: 'Alerte',
      urgent: 'Urgence',
      neutral: 'Information'
    };
    return (titles[value] as string) || 'Information';
  }
}
