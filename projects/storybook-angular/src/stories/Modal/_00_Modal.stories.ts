/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { BaoModalClose, BaoModalInitialConfig, BaoModalRef } from 'angular-ui';
import { BaoModalModuleTest } from 'projects/storybook-angular/src/app/modal/module';
import { ModalFormExample } from '../../app/modal/modal-form/modal-form-example.component';

const description = `

The modal is used to make the user focus on a specific message or process.
## Usage
### Modal configuration
- \`size?: eModalDesktopWidthSize\`. Options : \`SMALL, MEDIUM, LARGE\`

  - Default: \`eModalDesktopWidthSize.SMALL\`
  - Set the modal size for MD and LG screen width

- \`mobileSize?: eModalMobileWidthSize\`.  Options : \`FULL, COMPACT\`. 

  - Default: \`eModalMobileWidthSize.FULL\`
  - Set the modal size for SM screen width 

- \`data?: unknown\`

  - Data used in the modal content. Example: A JSON data that is consumed within a form in the modal.

- \`ariaLabelledBy?: string\`

  - For accessibility. It refers to the ID of an HTML element that could be a label to the modal. 

- \`variant?: eModalVariant\`. Options : \`GLOBAL, FILTER\`

  - Default: \`eModalVariant.GLOBAL\`
  - The filter variant modal is positioned relative to a trigger element 

- \`triggerElement?: ElementRef\`

  - Trigger element for connected positioning (used with filter variant).

- \`disableClose?: true\`

  - Default: \`false\`
  - Disable close on backdrop

### Modal functions

-  \`open(ModalContentComponent, config): void \`
-  \`afterClosed(): Observable<any> \`


\`\`\`typescript
import { Component, Inject } from '@angular/core';
import {
  BaoModal,
  BaoModalRef,
  BAO_MODAL_DATA
} from 'projects/angular-ui/src/public-api';

constructor(private modal: BaoModal) {}

@Component({
  selector: 'modal-trigger',
  template: 
    '<h5>Exemple avec formulaire</h5>
    <p>Votre adresse est {{ numeroCivique }} {{ rue }}</p>
    <button (click)="openModal()"> Modifier une adresse</button>'
})
export class ModalFormExample {
  public numeroCivique: string = '801';
  public rue: string = 'Brennan';

  constructor(public modal: BaoModal) {}

  public openModal() {
    const modalRef = this.modal.open(ModalContentComponent, {
      data: { numeroCivique: this.numeroCivique, rue: this.rue },
      ariaLabelledBy: 'bao-modal-unique-title-4'
    });

    modalRef.afterClosed().subscribe((result: AddressData) => {
      this.numeroCivique = result.numeroCivique;
      this.rue = result.rue;
    });
  }
}

@Component({
  selector: 'content-modal',
  templateUrl: 'content-modal.html'
})
export class ModalContentComponent {
  constructor(
    public dialogRef: BaoModalRef<ModalContentComponent>,
    @Inject(BAO_MODAL_DATA) public data: AddressData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
\`\`\`

\`\`\`html
<!-- content-modal.html -->
<div class="bao-modal-content">
  <div class="bao-modal-header">
    <h1 id="bao-modal-unique-title-4" class="bao-modal-title">Adresse</h1>
    <button
      bao-button
      type="button"
      displayType="utility"
      data-dismiss="modal"
      level="tertiary"
      no-text="true"
      (click)="onNoClick()"
    >
      <bao-icon
        color="action"
        svgIcon="icon-x"
        size="x-small"
        title="Fermer la fenêtre modale"
      ></bao-icon>
    </button>
  </div>
  <div class="bao-modal-body">
    <div class="form-group">
      <label for="numeroCivique">Numéro civique</label>
      <input
        type="text"
        class="form-control"
        id="numeroCivique"
        [(ngModel)]="data.numeroCivique"
      />
    </div>
    <div class="form-group">
      <label for="rue">Rue</label>
      <input type="text" class="form-control" id="rue" [(ngModel)]="data.rue" />
    </div>
  </div>
  <div class="bao-modal-footer">
    <button
      bao-button
      type="button"
      displayType="utility"
      level="tertiary"
      size="medium"
      (click)="onNoClick()"
    >
      Annuler
    </button>
    <button
      bao-button
      type="button"
      displayType="utility"
      level="primary"
      size="medium"
      [bao-modal-close]="data"
    >
      Action
    </button>
  </div>
</div>
\`\`\`


## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Modale](https://zeroheight.com/575tugn0n/p/905970)".
`;

export default {
  title: 'Components/Modal',
  component: ModalFormExample,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BaoModalModuleTest]
    })
  ],
  subcomponents: { BaoModalInitialConfig, BaoModalRef, BaoModalClose }
} as Meta;

const Template: StoryFn = args => ({
  props: args
});

export const Default = Template.bind({});
