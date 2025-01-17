/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ReactiveFormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  BaoFileInputComponent,
  BaoFileDropzoneIntructions,
  BaoFileDropDirective,
  BaoGuidingTextComponent,
  BaoButtonComponent,
  BaoLabelTextComponent,
  BaoErrorTextComponent,
  BaoIconComponent,
  BaoFilePreviewComponent,
  BaoDropdownMenuComponent,
  BaoDropdownMenuTrigger,
  BaoDropdownMenuItemLabel,
  BaoDropdownMenuItem
} from 'angular-ui';
import { BaoFileReactiveFormExampleComponent } from 'projects/storybook-angular-examples/src/app/file/file-example.component';

const description = `
The File Input component allows users to transfer local files to the system. 

## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Fichier](https://zeroheight.com/575tugn0n/p/26da67)".
`;

export default {
  title: 'Components/File/Selector',
  decorators: [
    moduleMetadata({
      declarations: [
        BaoFileInputComponent,
        BaoFileDropzoneIntructions,
        BaoFileDropDirective,
        BaoGuidingTextComponent,
        BaoButtonComponent,
        BaoLabelTextComponent,
        BaoErrorTextComponent,
        BaoIconComponent,
        BaoFilePreviewComponent,
        BaoFileReactiveFormExampleComponent,
        BaoDropdownMenuComponent,
        BaoDropdownMenuTrigger,
        BaoDropdownMenuItemLabel,
        BaoDropdownMenuItem
      ],
      imports: [CommonModule, OverlayModule, PortalModule, ReactiveFormsModule]
    })
  ],
  component: BaoFileInputComponent,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {
    ngAfterContentInit: {
      table: {
        disable: true
      }
    },
    uploadFile: {
      table: {
        disable: true
      }
    },
    _intlChanges: {
      table: {
        disable: true
      }
    },
    _value: {
      table: {
        disable: true
      }
    },
    insertDefaultInstructions: {
      table: {
        disable: true
      }
    },
    intl: {
      table: {
        disable: true
      }
    },
    isFileTooBig: {
      table: {
        disable: true
      }
    },
    isFileTypeInvalid: {
      table: {
        disable: true
      }
    },
    propagateChange: {
      table: {
        disable: true
      }
    },
    propagateTouched: {
      table: {
        disable: true
      }
    },
    uploadedFile: {
      table: {
        disable: true
      }
    },
    ngOnDestroy: {
      table: {
        disable: true
      }
    },
    registerOnChange: {
      table: {
        disable: true
      }
    },
    registerOnTouched: {
      table: {
        disable: true
      }
    },
    setDisabledState: {
      table: {
        disable: true
      }
    },
    setValue: {
      table: {
        disable: true
      }
    },
    writeValue: {
      table: {
        disable: true
      }
    },
    uploader: {
      table: {
        disable: true
      }
    },
    _files: {
      table: {
        disable: true
      }
    },
    _errorTexts: {
      table: {
        disable: true
      }
    },
    _errorForm: {
      table: {
        disable: true
      }
    },
    ngAfterViewInit: {
      table: {
        disable: true
      }
    },
    setDescribedByAttribute: {
      table: {
        disable: true
      }
    },
    setErrorTextsAttribute: {
      table: {
        disable: true
      }
    },
    _helperTextId: {
      table: {
        disable: true
      }
    },
    enterKeyEvent: {
      table: {
        disable: true
      }
    },
    shiftTabKeyEvent: {
      table: {
        disable: true
      }
    },
    tabKeyEvent: {
      table: {
        disable: true
      }
    },
    dropzoneElement: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: Story<BaoFileInputComponent> = (
  args: BaoFileInputComponent
) => ({
  component: BaoFileInputComponent,
  template: `
    <div style="max-width:24rem;">
      <bao-file-input [disabled]="disabled" [label]="label" [size]="size" [required]="required" [maximalFileSize]="maximalFileSize" [acceptedMIMETypes]="acceptedMIMETypes">
        <bao-guiding-text>Les documents .pdf, .docx, .png sont acceptés</bao-guiding-text>
        <bao-file-dropzone-instructions> ou deposer votre [elt] ici</bao-file-dropzone-instructions>
      </bao-file-input>
    </div>
   `,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {
  label: 'Libellé',
  size: 'medium',
  required: true,
  disabled: false,
  acceptedMIMETypes: ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png']
};

export const baoFileIntl: Story = args => ({
  props: args,
  template: `
      <div style="max-width:50rem;">
        <p> By default, the File Input component displays its texts in french. To display text in another language, here are the steps to follow:
        <ol>
          <li> In your <b>app.module.ts</b>, import <b>BaoFileIntl</b> and <b>BaoFileIntlEnglish</b> for texts in english from @villedemontreal/angular-ui. </li>
          <li> If you need to use the component in a different language, you can declare your own class that extends BaoFileIntl and contains texts in your prefered language. It should look like this:
            <p> 
              <code>@Injectable()<br>
                    class BaoFileIntlEnglish extends BaoFileIntl {{ '{' }}
                    <div style="margin-left:1rem;font-family:inherit;font-size:inherit;">
                      dropzoneButtonLabel = 'Browse';<br>
                      defaultDropzoneInstructions = 'or drop your file here';<br>
                      fileTooBigErrorMessage = 'The size of this file is too large';<br>
                      invalidFileTypeErrorMessage = 'The format of this file is unauthorized';<br>
                    </div>
                  {{ '}' }}
              </code>
            </p>
          </li>
          <li>In the providers of your app's module, add this line:<br>
            <code> providers: [{{ '{' }}provide: BaoFileIntl, useClass: BaoFileIntlEnglish{{ '}' }}]</code> 
          </li>
          <li> And that's it, the content of the component should now be in your preferedd language!</li>
        </ol>
      </div>
  `
});
baoFileIntl.storyName = 'BAOFileIntl - Translating the File Input component';
baoFileIntl.args = {
  ...Primary.args
};

export const fileInputDeactivated: Story = args => ({
  props: args,
  template: `
      <div style="max-width:24rem;">
        <bao-file-input disabled="true" [label]="label">
          <bao-guiding-text>Les documents .pdf, .docx, .png sont acceptés</bao-guiding-text>
          <bao-file-dropzone-instructions> ou déposer votre [elt] ici</bao-file-dropzone-instructions>
        </bao-file-input>
      </div>
  `
});
fileInputDeactivated.storyName = 'File input deactivated';
fileInputDeactivated.args = {
  ...Primary.args
};

export const fileInputForm: Story = args => ({
  props: args,
  template: `
    <bao-file-form-example></bao-file-form-example>
  `
});
fileInputForm.storyName = 'File input reactive form';
fileInputForm.args = {
  ...Primary.args
};
