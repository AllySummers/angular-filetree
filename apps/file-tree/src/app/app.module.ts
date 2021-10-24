import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IconsModule } from '@aft/icons';

import { AppComponent } from './app.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { FileComponent } from './components/file/file.component';
import { FolderComponent } from './components/folder/folder.component';

@NgModule({
  declarations: [AppComponent, FileListComponent, FileComponent, FolderComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, IconsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
