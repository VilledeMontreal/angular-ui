import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TaskModule } from './taskbox/task.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppComponent } from './app.component';
import { InboxScreenComponent } from './taskbox/task-list/inbox-screen.component';
import { PureInboxScreenComponent } from './taskbox/task-list/pure-inbox-screen.component';

@NgModule({
  declarations: [AppComponent, InboxScreenComponent, PureInboxScreenComponent],
  imports: [
    BrowserModule,
    TaskModule,
    NgxsModule.forRoot([]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
