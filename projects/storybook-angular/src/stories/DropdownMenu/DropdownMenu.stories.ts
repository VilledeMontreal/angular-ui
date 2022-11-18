/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  BaoDropdownMenuComponent,
  BaoDropdownMenuTrigger,
  BaoDropdownMenuItem,
  BaoDropdownMenuSection,
  BaoDropdownMenuItemLabel,
  BaoDropdownMenuItemDescription,
  BaoDropdownMenuDivider,
  BaoIconComponent,
  BaoButtonComponent,
  BaoAvatarComponent,
  BaoAvatarContent,
  BaoCheckboxComponent,
  BaoRadioButtonComponent
} from 'angular-ui';

const description = `
The dropdown menu component reveals a list of actions or options
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Menu déroulant](https://zeroheight.com/575tugn0n/p/3423b2)".
`;

export default {
  title: 'Components/DropdownMenu',
  decorators: [
    moduleMetadata({
      declarations: [
        BaoDropdownMenuTrigger,
        BaoDropdownMenuItem,
        BaoDropdownMenuSection,
        BaoDropdownMenuItemLabel,
        BaoDropdownMenuItemDescription,
        BaoIconComponent,
        BaoButtonComponent,
        BaoAvatarComponent,
        BaoAvatarContent,
        BaoCheckboxComponent,
        BaoRadioButtonComponent,
        BaoDropdownMenuDivider
      ],
      imports: [CommonModule, OverlayModule, PortalModule]
    }),
    componentWrapperDecorator(
      story => `<div style="max-width:30rem;">${story}</div>`
    )
  ],
  component: BaoDropdownMenuComponent,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {
    _isOpen: {
      table: {
        disable: true
      }
    },
    menuId: {
      table: {
        disable: true
      }
    },
    _menuPortal: {
      table: {
        disable: true
      }
    },
    downKeyEvent: {
      table: {
        disable: true
      }
    },
    upKeyEvent: {
      table: {
        disable: true
      }
    },
    focusFirstItem: {
      table: {
        disable: true
      }
    },
    focusNextItem: {
      table: {
        disable: true
      }
    },
    getNextActivableItemIndex: {
      table: {
        disable: true
      }
    },
    _activeItemIndex: {
      table: {
        disable: true
      }
    },
    _listItems: {
      table: {
        disable: true
      }
    },
    canMove: {
      table: {
        disable: true
      }
    },
    open: {
      table: {
        disable: true
      }
    },
    close: {
      table: {
        disable: true
      }
    },
    ngAfterViewInit: {
      table: {
        disable: true
      }
    },
    _menuContent: {
      table: {
        disable: true
      }
    },
    tabKeyEvent: {
      table: {
        disable: true
      }
    },
    shiftTabKeyEvent: {
      table: {
        disable: true
      }
    },
    setNavigationAttribute: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: Story<BaoDropdownMenuComponent> = (
  args: BaoDropdownMenuComponent
) => ({
  component: BaoDropdownMenuComponent,
  template: `
          <button bao-button [baoDropdownMenuTriggerFor]="testMenu" type="editorial" level="primary" 
            size="medium" style="margin-right: 1rem;">
              <span>Actions</span>
              <bao-icon svgIcon="icon-chevron-down"></bao-icon>
          </button>
          <bao-dropdown-menu #testMenu>
            <ul>
              <li>
                <a bao-dropdown-menu-item>
                  <bao-dropdown-menu-item-label>Libellé</bao-dropdown-menu-item-label>
                </a>
              </li>   
              <li>
                <a bao-dropdown-menu-item>
                  <bao-dropdown-menu-item-label>Libellé</bao-dropdown-menu-item-label>
                </a>
              </li>
              <li>
                <a bao-dropdown-menu-item>
                  <bao-dropdown-menu-item-label>Libellé</bao-dropdown-menu-item-label>
                </a>
              </li>
            </ul>
          </bao-dropdown-menu>
 `,
  props: args
});

export const Primary = Template.bind({});
Primary.args = {};

export const menuWithDescriptionIcon: Story = args => ({
  props: args,
  template: `
      <button bao-button [baoDropdownMenuTriggerFor]="testMenu1" type="utility" level="secondary" 
        size="medium" style="margin-right: 10rem;">
        <span>Icons</span>
        <bao-icon svgIcon="icon-chevron-down"></bao-icon>
      </button>
      <bao-dropdown-menu #testMenu1>
        <ul>
          <li>
            <a bao-dropdown-menu-item>
              <bao-icon svgIcon="icon-copy" color="tertiary"></bao-icon>
              <bao-dropdown-menu-item-label>Copy</bao-dropdown-menu-item-label>
              <bao-dropdown-menu-item-description>Voici une description</bao-dropdown-menu-item-description>
            </a>
          </li>
          <li>   
            <a bao-dropdown-menu-item> 
              <bao-icon svgIcon="icon-archive"></bao-icon>
              <bao-dropdown-menu-item-label>Archive</bao-dropdown-menu-item-label>
              <bao-dropdown-menu-item-description>Voici une description</bao-dropdown-menu-item-description>
            </a>
          </li>
          <li>
            <a bao-dropdown-menu-item> 
              <bao-icon svgIcon="icon-trash"></bao-icon>
              <bao-dropdown-menu-item-label>Delete</bao-dropdown-menu-item-label>
              <bao-dropdown-menu-item-description>Voici une description</bao-dropdown-menu-item-description>
            </a>
          </li>
        </ul>
      </bao-dropdown-menu>
  `
});
menuWithDescriptionIcon.storyName = 'Dropdown menu - Descriptions and icons';
menuWithDescriptionIcon.args = {
  ...Primary.args
};

export const menuWithAvatars: Story = args => ({
  props: args,
  template: `
    <button bao-button [baoDropdownMenuTriggerFor]="testMenu2" type="utility" level="secondary" 
      size="medium" style="margin-right: 1rem;">
      <span>Avatars</span>
      <bao-icon svgIcon="icon-chevron-down"></bao-icon>
    </button>
    <bao-dropdown-menu #testMenu2>
      <ul>
        <li>
          <a bao-dropdown-menu-item>
            <bao-avatar color="background-color-2">
              <span bao-avatar-content>aaaa</span>
            </bao-avatar>
            <bao-dropdown-menu-item-label>Annie</bao-dropdown-menu-item-label>
          </a>
        </li>
        <li>   
          <a bao-dropdown-menu-item> 
            <bao-avatar color="background-color-4">
              <span bao-avatar-content>bg</span>
            </bao-avatar>
            <bao-dropdown-menu-item-label>Benoit</bao-dropdown-menu-item-label>
          </a>
        </li>
        <li>
          <a bao-dropdown-menu-item> 
            <bao-avatar color="background-color-3">
              <span bao-avatar-content>wf</span>
            </bao-avatar>
            <bao-dropdown-menu-item-label>William</bao-dropdown-menu-item-label>
          </a>
        </li>
      </ul>
    </bao-dropdown-menu>
  `
});
menuWithAvatars.storyName = 'Dropdown menu - Avatars';
menuWithAvatars.args = {
  ...Primary.args
};

export const menuWithCheckbox: Story = args => ({
  props: args,
  template: `
    <button bao-button [baoDropdownMenuTriggerFor]="testMenu3" type="utility" level="secondary" 
      size="medium" style="margin-right: 1rem;">
      <span>Checkbox</span>
      <bao-icon svgIcon="icon-chevron-down"></bao-icon>
    </button>
    <bao-dropdown-menu #testMenu3>
      <ul>
        <li>
          <a bao-dropdown-menu-item>
            <bao-checkbox></bao-checkbox>
            <bao-dropdown-menu-item-label>Bananes</bao-dropdown-menu-item-label>
            <bao-dropdown-menu-item-description>Fruit</bao-dropdown-menu-item-description>
          </a>
        </li>
        <li>   
          <a bao-dropdown-menu-item [disabled]=true> 
            <bao-checkbox [disabled]=true></bao-checkbox>
            <bao-dropdown-menu-item-label>Épinards (disabled)</bao-dropdown-menu-item-label>
            <bao-dropdown-menu-item-description>Légume</bao-dropdown-menu-item-description>
          </a>
        </li>
        <li>
          <a bao-dropdown-menu-item> 
            <bao-checkbox></bao-checkbox>
            <bao-dropdown-menu-item-label>Avoine</bao-dropdown-menu-item-label>
            <bao-dropdown-menu-item-description>Céréale</bao-dropdown-menu-item-description>
          </a>
        </li>
      </ul>
    </bao-dropdown-menu>
  `
});
menuWithCheckbox.storyName = 'Dropdown menu - Checkboxes';
menuWithCheckbox.args = {
  ...Primary.args
};

export const menuWithRadio: Story = args => ({
  props: args,
  template: `
    <button bao-button [baoDropdownMenuTriggerFor]="testMenu4" type="utility" level="secondary" 
      size="medium" style="margin-right: 1rem;">
      <span>Radio buttons</span>
      <bao-icon svgIcon="icon-chevron-down"></bao-icon>
    </button>
    <bao-dropdown-menu #testMenu4>
      <ul>
        <li>
          <a bao-dropdown-menu-item>
            <bao-radio-button></bao-radio-button>
            <bao-dropdown-menu-item-label>Bleu</bao-dropdown-menu-item-label>
          </a>
        </li>
        <li>   
          <a bao-dropdown-menu-item> 
            <bao-radio-button></bao-radio-button>
            <bao-dropdown-menu-item-label>Blanc</bao-dropdown-menu-item-label>
          </a>
        </li>
        <li>
          <a bao-dropdown-menu-item> 
            <bao-radio-button></bao-radio-button>
            <bao-dropdown-menu-item-label>Rouge</bao-dropdown-menu-item-label>
          </a>
        </li>
      </ul>
    </bao-dropdown-menu>
  `
});
menuWithRadio.storyName = 'Dropdown menu - Radio buttons';
menuWithRadio.args = {
  ...Primary.args
};

export const navigationMenu: Story = args => ({
  props: args,
  template: `
    <button bao-button [baoDropdownMenuTriggerFor]="testMenu5" type="utility" level="secondary" 
      size="medium" style="margin-right: 1rem;">
      <span>Mon compte</span>
      <bao-icon svgIcon="icon-chevron-down"></bao-icon>
    </button>
    <bao-dropdown-menu #testMenu5>
      <ul>
        <li>
          <a bao-dropdown-menu-item href=#>
            <bao-dropdown-menu-item-label>Services</bao-dropdown-menu-item-label>
          </a>
        </li>
        <li>   
          <a bao-dropdown-menu-item class="active-link" href=# aria-current="page">
            <bao-dropdown-menu-item-label>Demandes</bao-dropdown-menu-item-label>
          </a>
        </li>
        <li>
          <a bao-dropdown-menu-item href=#>
            <bao-dropdown-menu-item-label>Tâches</bao-dropdown-menu-item-label>
          </a>
        </li>
        <li>
          <a bao-dropdown-menu-item href=#>
            <bao-dropdown-menu-item-label>Journal d'activités</bao-dropdown-menu-item-label>
          </a>
        </li>
        <li>
          <a bao-dropdown-menu-item href=#>
            <bao-dropdown-menu-item-label>Informations personnelles</bao-dropdown-menu-item-label>
          </a>
        </li>
        <li>
          <a bao-dropdown-menu-item href=#>
            <bao-dropdown-menu-item-label>Paramètre du compte</bao-dropdown-menu-item-label>
          </a>
        </li>
        <li>
          <a bao-dropdown-menu-item href=#>
            <bao-dropdown-menu-item-label>Préférences de communication</bao-dropdown-menu-item-label>
          </a>
        </li>
        <bao-dropdown-menu-divider></bao-dropdown-menu-divider>
        <li>
          <a bao-dropdown-menu-item href=#>
            <bao-dropdown-menu-item-label>Ajouter une organisation</bao-dropdown-menu-item-label>
          </a>
        </li>
        <bao-dropdown-menu-divider></bao-dropdown-menu-divider>
        <li>
          <a bao-dropdown-menu-item href=#>
            <bao-dropdown-menu-item-label>Se déconnecter</bao-dropdown-menu-item-label>
          </a>
        </li>
      </ul>
    </bao-dropdown-menu>
  `
});
navigationMenu.storyName = 'Dropdown menu - Navigation';
navigationMenu.args = {
  ...Primary.args
};

export const menuSectionsWithIcon: Story = args => ({
  props: args,
  template: `
      <button bao-button [baoDropdownMenuTriggerFor]="testMenu6" type="editorial" level="tertiary" 
        size="medium" style="margin-right: 1rem;">
          <bao-icon svgIcon="icon-more-vertical"></bao-icon>
      </button>
      <bao-dropdown-menu #testMenu6>
        <ul>
          <li bao-dropdown-menu-section>
              Titre de section 1
            <ul>
              <li>
                <a bao-dropdown-menu-item>
                  <bao-icon svgIcon="icon-copy" color="tertiary"></bao-icon>
                  <bao-dropdown-menu-item-label>Copy</bao-dropdown-menu-item-label>
                  <bao-dropdown-menu-item-description>Voici une description</bao-dropdown-menu-item-description>
                </a>
              </li>
              <li>   
                <a bao-dropdown-menu-item> 
                  <bao-icon svgIcon="icon-archive"></bao-icon>
                  <bao-dropdown-menu-item-label>Archive</bao-dropdown-menu-item-label>
                  <bao-dropdown-menu-item-description>Voici une description</bao-dropdown-menu-item-description>
                </a>
              </li>
              <li>
                <a bao-dropdown-menu-item [disabled]=true> 
                  <bao-icon svgIcon="icon-trash"></bao-icon>
                  <bao-dropdown-menu-item-label>Delete (disabled)</bao-dropdown-menu-item-label>
                  <bao-dropdown-menu-item-description>Voici une description</bao-dropdown-menu-item-description>
                </a>
              </li>
            </ul>
          </li>
          <bao-dropdown-menu-divider></bao-dropdown-menu-divider>
          <li bao-dropdown-menu-section>
            Titre de section 2
            <ul>
              <li>
                <a bao-dropdown-menu-item>
                  <bao-icon svgIcon="icon-copy" color="tertiary"></bao-icon>
                  <bao-dropdown-menu-item-label>Copy</bao-dropdown-menu-item-label>
                  <bao-dropdown-menu-item-description>Voici une description</bao-dropdown-menu-item-description>
                </a>
              </li>
              <li>   
                <a bao-dropdown-menu-item> 
                  <bao-icon svgIcon="icon-archive"></bao-icon>
                  <bao-dropdown-menu-item-label>Archive</bao-dropdown-menu-item-label>
                  <bao-dropdown-menu-item-description>Voici une description</bao-dropdown-menu-item-description>
                </a>
              </li>
              <li>
                <a bao-dropdown-menu-item> 
                  <bao-icon svgIcon="icon-trash"></bao-icon>
                  <bao-dropdown-menu-item-label>Delete</bao-dropdown-menu-item-label>
                  <bao-dropdown-menu-item-description>Voici une description</bao-dropdown-menu-item-description>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </bao-dropdown-menu>
  `
});
menuSectionsWithIcon.storyName = 'Dropdown menu with sections';
menuSectionsWithIcon.args = {
  ...Primary.args
};
