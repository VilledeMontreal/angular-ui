/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

const KILO_THRESHOLD = 1000;
const MEGA_THRESHOLD = 1000000;

@Component({
  selector: 'bao-file-preview, [bao-file-preview]',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'bao-file-preview'
  }
})
export class BaoFilePreviewComponent implements AfterContentInit {
  /**
   * Uploaded file to display in list.
   */
  @Input() public file: File;

  /**
   * Is file loading
   */
  @Input() public isLoading = false;

  /**
   * True if projected content has no icon and file does not have a thumbnail.
   */
  public insertGenericIcon = false;

  public thumbnailURL = '';

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  get fileSize(): string {
    return this.formatSize(this.file.size);
  }

  ngAfterContentInit(): void {
    this.getThumbnail();
    this.setIcon();
  }

  private setIcon() {
    // If no icon is in the projected content, generic icon is added
    const contentIcon = Array.from(
      this.nativeElement.children.item(0).children
    ).find((el: HTMLElement) => el.localName === 'bao-icon');
    if (!contentIcon) {
      this.insertGenericIcon = true;
    } else {
      this.renderer.addClass(contentIcon, 'bao-file-media');
    }
  }

  private getThumbnail() {
    if (
      this.file &&
      (this.file.type === 'image/png' || this.file.type === 'image/jpeg')
    ) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.thumbnailURL = event.target.result;
      };

      reader.onerror = () => {
        this.thumbnailURL = '';
      };
      reader.readAsDataURL(this.file);
    }
  }

  private formatSize(size: number) {
    if (size >= KILO_THRESHOLD && size / KILO_THRESHOLD < KILO_THRESHOLD) {
      return this.getSizeAndUnit(size, KILO_THRESHOLD, 'Ko');
    }
    const sizeDividedByKoMultiplicator = size / KILO_THRESHOLD;
    if (sizeDividedByKoMultiplicator >= KILO_THRESHOLD) {
      const toFixed = sizeDividedByKoMultiplicator > 10 ? 0 : 1;
      return this.getSizeAndUnit(size, MEGA_THRESHOLD, 'Mo', toFixed);
    }
    return `${size} octets`;
  }

  private getSizeAndUnit(
    size: number,
    multiplicator: number,
    unit: string,
    toFixed = 0
  ): string {
    return `${(size / multiplicator).toFixed(toFixed)} ${unit}`;
  }
}
