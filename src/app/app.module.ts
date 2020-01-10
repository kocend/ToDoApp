import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';

import { StorageServiceModule } from  'ngx-webstorage-service';
import { TaskDetailsComponent } from './task-details/task-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskManagerComponent,
    TaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StorageServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
