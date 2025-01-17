/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component } from '@angular/core';

/**
 * @title Basic checkboxes
 */
@Component({
  selector: 'bao-checkbox-example',
  templateUrl: './checkbox-example.component.html'
})
export class BaoCheckboxExampleComponent {
  public task = {
    name: 'Tous les animaux',
    subtasks: [
      { name: 'Chien', completed: true },
      { name: 'Chat', completed: false },
      { name: 'Poisson', completed: false }
    ]
  };

  public allComplete: boolean = false;

  public updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  public someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    const isSomeComplete =
      this.task.subtasks.filter((t: any) => t.completed).length > 0 &&
      !this.allComplete;
    return isSomeComplete;
  }

  public setAll(completed: boolean) {
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t: any) => (t.completed = completed));
  }
}
