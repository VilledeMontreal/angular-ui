/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BaoAvatarComponent, BaoAvatarContent } from './index';
import {
  TestAvatarIconHostComponent,
  TestAvatarImageHostComponent,
  TestAvatarTextHostComponent
} from './tests/avatar.hostcomponent.spec';

describe('BaoAvatarComponent', () => {
  const DEFAULT_PROFILE_NAME = 'Avatar du profil';
  describe('Default - With icon', () => {
    let fixture: ComponentFixture<TestAvatarIconHostComponent>;
    let avatarDebugElement: DebugElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          BaoAvatarComponent,
          BaoAvatarContent,
          TestAvatarIconHostComponent
        ]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestAvatarIconHostComponent);
      fixture.detectChanges();
      avatarDebugElement = fixture.debugElement.query(By.css('.bao-avatar'));
    });
    it('should have svg element', () => {
      expect(
        avatarDebugElement.children.find(el => el.name === 'svg')
      ).toBeDefined();
    });
    it('should add default profile name in new title tag', () => {
      const svgElement = avatarDebugElement.children.find(
        el => el.name === 'svg'
      );
      const titleElement = svgElement.children.find(el => el.name === 'title');
      expect(titleElement).toBeDefined();
      expect(titleElement.nativeNode.textContent).toBe(DEFAULT_PROFILE_NAME);
    });
  });
  describe('With text', () => {
    let component: TestAvatarTextHostComponent;
    let fixture: ComponentFixture<TestAvatarTextHostComponent>;
    let avatarDebugElement: DebugElement;
    let avatarContentDebugElement: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          BaoAvatarComponent,
          BaoAvatarContent,
          TestAvatarTextHostComponent
        ]
      });
      return TestBed.compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestAvatarTextHostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      avatarDebugElement = fixture.debugElement.query(By.css('.bao-avatar'));
      avatarContentDebugElement = fixture.debugElement.query(
        By.css('.bao-avatar-content')
      );
    });
    it('should have element displaying default profile name for screen readers', () => {
      const spanElement = avatarDebugElement.children.find(
        el => el.name === 'SPAN' && el.classes['sr-only']
      );
      expect(spanElement).toBeDefined();
      expect(spanElement.nativeNode.innerText).toBe(DEFAULT_PROFILE_NAME);
    });
    it('should apply property to hide text form screen readers', () => {
      expect(avatarContentDebugElement.nativeNode.ariaHidden).toBe('true');
    });
    it('should apply proper color class based on color input', () => {
      expect(
        avatarDebugElement.nativeNode.classList.contains('display-color')
      ).toBe(true);
      for (let i = 1; i < 11; i++) {
        component.color = `background-color-${i}`;
        fixture.detectChanges();
        expect(
          avatarDebugElement.nativeNode.classList.contains(
            `bao-avatar-color-${i}`
          )
        ).toBe(true);
      }
    });
    it('should not display more than two characters', () => {
      expect(avatarContentDebugElement.nativeNode.innerText.length).toBe(2);
    });
  });
  describe('With image', () => {
    let fixture: ComponentFixture<TestAvatarImageHostComponent>;
    let avatarContentDebugElement: DebugElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          BaoAvatarComponent,
          BaoAvatarContent,
          TestAvatarImageHostComponent
        ]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestAvatarImageHostComponent);
      fixture.detectChanges();
      avatarContentDebugElement = fixture.debugElement.query(
        By.css('.bao-avatar-content')
      );
    });
    it('should add default profile name in proper attribute', () => {
      expect(avatarContentDebugElement.nativeNode.alt).toBe(
        DEFAULT_PROFILE_NAME
      );
    });
  });
});
