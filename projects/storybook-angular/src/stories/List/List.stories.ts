// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  BaoIconModule,
  BaoListItem,
  BaoListModule,
  BaoTagModule
} from 'angular-ui';

const description = `
A list of utility items is a list composed of complex objects intended for an application or a tool.
`;

export default {
  title: 'Components/List',
  decorators: [
    moduleMetadata({
      // declarations: [BaoListItem],
      imports: [BaoListModule, BaoIconModule, BaoTagModule]
    })
  ],
  component: BaoListItem,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {}
} as Meta;

const Template: Story<BaoListItem & { content: string }> = (
  args: BaoListItem
) => ({
  component: BaoListItem,
  template: `
    <bao-list>
      <bao-list-item>{{content}}</bao-list-item>
      <bao-list-item>{{content}}</bao-list-item>
    </bao-list>
 `,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {
  content: 'content'
};

export const SimpleListWithLeftIcon: Story = args => ({
  props: args,
  template: `
    <bao-list>
      <bao-list-item>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
      </bao-list-item>
      <bao-list-item>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
      </bao-list-item>
    </bao-list>
    `
});
SimpleListWithLeftIcon.storyName = 'Simple list - Left icon';
SimpleListWithLeftIcon.args = {
  ...Primary.args
};

export const SimpleListWithRightIcon: Story = args => ({
  props: args,
  template: `
    <bao-list>
      <bao-list-item>
        <span bao-list-item-title>Title</span>
        <bao-icon baoIconTag svgIcon="icon-check"></bao-icon>
      </bao-list-item>
      <bao-list-item>
        <span bao-list-item-title>Title</span>
        <bao-icon baoIconTag svgIcon="icon-check"></bao-icon>
      </bao-list-item>
    </bao-list>
    `
});
SimpleListWithRightIcon.storyName = 'Simple list - Right icon';
SimpleListWithRightIcon.args = {
  ...Primary.args
};

export const SimpleListWithTag: Story = args => ({
  props: args,
  template: `
    <bao-list>
      <bao-list-item>
          <span bao-list-item-title>Title</span>
          <bao-tag type="positive"><span>Label</span></bao-tag>
      </bao-list-item>
      <bao-list-item>
          <span bao-list-item-title>Title</span>
          <bao-tag type="positive"><span>Label</span></bao-tag>
      </bao-list-item>
    </bao-list>
    `
});
SimpleListWithTag.storyName = 'Simple list - Tag';
SimpleListWithTag.args = {
  ...Primary.args
};

export const SimpleListWithTagAndIcon: Story = args => ({
  props: args,
  template: `
  <bao-list>
    <bao-list-item>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
        <bao-tag type="positive"><span>Label</span></bao-tag>
    </bao-list-item>
    <bao-list-item>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
        <bao-tag type="positive"><span>Label</span></bao-tag>
    </bao-list-item>
  </bao-list>
  `
});
SimpleListWithTagAndIcon.storyName = 'Simple list - Tag & Icon';
SimpleListWithTagAndIcon.args = {
  ...Primary.args
};

export const SimpleListWithDescription: Story = args => ({
  props: args,
  template: `
  <bao-list>
    <bao-list-item>
      <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
      <span bao-list-item-title>Title</span>
      <bao-tag type="positive"><span>Label</span></bao-tag>
      <bao-list-item-description>
        <div>Description 1</div>
        <div>Description 2</div>
      </bao-list-item-description>
    </bao-list-item>
    <bao-list-item>
      <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
      <span bao-list-item-title>Title</span>
      <bao-tag type="positive"><span>Label</span></bao-tag>
      <bao-list-item-description>
        <div>Description 1</div>
        <div>Description 2</div>
      </bao-list-item-description>
    </bao-list-item>
    <bao-list-item>
      <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
      <span bao-list-item-title>Title</span>
      <bao-tag type="positive"><span>Label</span></bao-tag>
      <bao-list-item-description>
        <div>Description 1</div>
        <div>Description 2</div>
      </bao-list-item-description>
    </bao-list-item>
  </bao-list>
  `
});
SimpleListWithDescription.storyName = 'Simple list - Description';
SimpleListWithDescription.args = {
  ...Primary.args
};

export const SimpleListWithInlineDescription: Story = args => ({
  props: args,
  template: `
  <bao-list>
    <bao-list-item>
      <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
      <span bao-list-item-title>Title</span>
      <ul bao-list-item-description>
        <li>Description 1</li>
        <li>Description 2</li>
      </ul>
      <bao-tag type="positive"><span>Label</span></bao-tag>
    </bao-list-item>
    <bao-list-item>
      <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
      <span bao-list-item-title>Title</span>
      <ul bao-list-item-description>
        <li>Description 1</li>
        <li>Description 2</li>
      </ul>
      <bao-tag type="positive"><span>Label</span></bao-tag>
    </bao-list-item>
    <bao-list-item>
      <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
      <span bao-list-item-title>Title</span>
      <ul bao-list-item-description>
        <li>Description 1</li>
        <li>Description 2</li>
      </ul>
      <bao-tag type="positive"><span>Label</span></bao-tag>
    </bao-list-item>
  </bao-list>
  `
});
SimpleListWithInlineDescription.storyName = 'Simple list - Inline Description';
SimpleListWithInlineDescription.args = {
  ...Primary.args
};
