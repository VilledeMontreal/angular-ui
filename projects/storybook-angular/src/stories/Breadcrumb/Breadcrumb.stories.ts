import { Meta, Story } from '@storybook/angular/types-6-0';
import { BaoBreadcrumbComponent } from 'angular-ui';

const description = `
The breadcrumb trail component allows users to locate themselves within the depth of a website's pages, while keeping a quick access to previous levels they've already visited.

## Properties
The breadcrumb component has no properties.

`;

export default {
  title: 'Components/Breadcrumb',
  component: BaoBreadcrumbComponent,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {
    ngAfterViewInit: {
      table: {
        disable: true
      }
    },
    setLastLinkAttribute: {
      table: {
        disable: true
      }
    },
    onContentChange: {
      table: {
        disable: true
      }
    },
    staticContainer: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: Story<BaoBreadcrumbComponent> = (
  args: BaoBreadcrumbComponent
) => ({
  component: BaoBreadcrumbComponent,
  template: `
  <bao-breadcrumb>
    <a href=#>parent page</a>
    <a href=#>parent page</a>
    <a href=#>current page</a>
  </bao-breadcrumb>
 `,
  props: args
});

export const Primary = Template.bind({});
