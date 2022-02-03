import { moduleMetadata, Meta, Story } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { PureInboxScreenComponent } from 'projects/storybook-angular-examples/src/app/taskbox/task-list/pure-inbox-screen.component';
import { TaskModule } from 'projects/storybook-angular-examples/src/app/taskbox/task.module';
import { Store, NgxsModule } from '@ngxs/store';
import { TasksState } from 'projects/storybook-angular-examples/src/app/taskbox/state/task.state';

export default {
  title: 'Applications/TaskList',
  component: PureInboxScreenComponent,
  decorators: [
    moduleMetadata({
      declarations: [PureInboxScreenComponent],
      imports: [CommonModule, TaskModule, NgxsModule.forRoot([TasksState])],
      providers: [Store],
    }),
  ],
} as Meta;

const Template: Story = args => ({
  props: args,
});

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: true,
};