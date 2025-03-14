/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaoIconModule } from 'projects/angular-ui/src/lib/icon/module';
import { BaoButtonModule } from 'projects/angular-ui/src/lib/button/module';
import { BaoHyperlinkModule } from 'projects/angular-ui/src/lib/hyperlink/module';
import { By } from '@angular/platform-browser';
import {
  BaoMessageBarComponent,
  BaoMessageBarContent
} from '../message-bar.component';
import { SimpleChange } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

@Component({
  selector: 'bao-test-host-text',
  template: `
    <bao-message-bar [type]="type" [dismissible]="dismissible">
      This is a plain text message with no links.
    </bao-message-bar>
  `
})
class TestHostTextComponent {
  type = 'info';
  dismissible = false;
}

@Component({
  selector: 'bao-test-host-anchor',
  template: `
    <bao-message-bar [type]="type" [dismissible]="dismissible">
      This is a message with <a href="https://example.com">HTML anchor tag</a>.
    </bao-message-bar>
  `
})
class TestHostAnchorComponent {
  type = 'info';
  dismissible = false;
}

@Component({
  selector: 'bao-test-host-hyperlink',
  template: `
    <bao-message-bar [type]="type" [dismissible]="dismissible">
      This is a message with
      <bao-hyperlink href="https://example.com">
        HyperLink Component
      </bao-hyperlink>
    </bao-message-bar>
  `
})
class TestHostHyperlinkComponent {
  type = 'info';
  dismissible = false;
}

@Component({
  selector: 'bao-test-host-mixed-content',
  template: `
    <bao-message-bar [type]="type" [dismissible]="dismissible">
      This is a message with both
      <a href="https://example.com">HTML anchor</a> and
      <bao-hyperlink href="https://example.com">
        HyperLink Component </bao-hyperlink
      >.
    </bao-message-bar>
  `
})
class TestHostMixedContentComponent {
  type = 'info';
  dismissible = false;
}

describe('BaoMessageBarComponent', () => {
  let component: BaoMessageBarComponent;
  let fixture: ComponentFixture<BaoMessageBarComponent>;
  let textFixture: ComponentFixture<TestHostTextComponent>;
  let anchorFixture: ComponentFixture<TestHostAnchorComponent>;
  let hyperlinkFixture: ComponentFixture<TestHostHyperlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BaoMessageBarComponent,
        BaoMessageBarContent,
        TestHostTextComponent,
        TestHostAnchorComponent,
        TestHostHyperlinkComponent,
        TestHostMixedContentComponent
      ],
      imports: [BaoIconModule, BaoButtonModule, BaoHyperlinkModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoMessageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    textFixture = TestBed.createComponent(TestHostTextComponent);
    textFixture.detectChanges();

    anchorFixture = TestBed.createComponent(TestHostAnchorComponent);
    anchorFixture.detectChanges();

    hyperlinkFixture = TestBed.createComponent(TestHostHyperlinkComponent);
    hyperlinkFixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set type to "info" if no type was provided', () => {
    const defaultFixture = TestBed.createComponent(BaoMessageBarComponent);
    const defaultComponent = defaultFixture.componentInstance;
    defaultFixture.detectChanges();
    expect(defaultComponent.type).toBe('info');
  });

  it('should set the correct icon based on type', () => {
    component.type = 'alert';
    component.ngOnChanges({
      type: new SimpleChange(null, 'alert', false)
    });
    fixture.detectChanges();
    expect(component.iconType).toBe('icon-warning');
  });

  it('should display the correct plain text message content', () => {
    const messageElement = textFixture.debugElement.query(
      By.css('.bao-message-content')
    );
    expect(messageElement.nativeElement.textContent.trim()).toBe(
      'This is a plain text message with no links.'
    );
  });

  it('should display a standard <a> link inside the message content', () => {
    const linkElement = anchorFixture.debugElement.query(
      By.css('.bao-message-content a')
    );
    expect(linkElement).toBeTruthy();
    expect(linkElement.nativeElement.textContent.trim()).toBe(
      'HTML anchor tag'
    );
    expect(linkElement.nativeElement.getAttribute('href')).toBe(
      'https://example.com'
    );
  });

  it('should display a <bao-hyperlink> component inside the message content', () => {
    const hyperlinkElement = hyperlinkFixture.debugElement.query(
      By.css('bao-hyperlink')
    );
    expect(hyperlinkElement).toBeTruthy();
    expect(hyperlinkElement.nativeElement.textContent.trim()).toBe(
      'HyperLink Component'
    );
    expect(hyperlinkElement.nativeElement.getAttribute('href')).toBe(
      'https://example.com'
    );
  });

  it('should not display a link if not included in ng-content', () => {
    fixture = TestBed.createComponent(BaoMessageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(
      By.css('.bao-message-content a, .bao-message-content bao-hyperlink')
    );
    expect(linkElement).toBeFalsy();
  });

  it('should render a close button if dismissible is true', () => {
    component.dismissible = true;
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(
      By.css('.bao-message-close')
    );
    expect(closeButton).toBeTruthy();
  });

  it('should NOT render a close button if dismissible is false', () => {
    component.dismissible = false;
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(
      By.css('.bao-message-close')
    );
    expect(closeButton).toBeFalsy();
  });

  it('should set the correct aria-label for the close button', () => {
    component.dismissible = true;
    component.dismissibleButtonAriaLabel = 'Fermer le message';
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(
      By.css('.bao-message-close')
    );
    expect(closeButton.nativeElement.getAttribute('aria-label')).toBe(
      'Fermer le message'
    );
  });

  it('should emit dismiss event when close button is clicked', fakeAsync(() => {
    spyOn(component.dismiss, 'emit');
    component.dismissible = true;
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(
      By.css('.bao-message-close')
    );
    expect(closeButton).toBeTruthy();
    closeButton.nativeElement.click();
    tick(300);
    expect(component.dismiss.emit).toHaveBeenCalled();
  }));
});
