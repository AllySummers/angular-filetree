import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './components/file/file.component';
import { FolderComponent } from './components/folder/folder.component';
import { CheckComponent } from './components/check/check.component';
import { CheckCircleComponent } from './components/check-circle/check-circle.component';
import { TimesComponent } from './components/times/times.component';
import { TimesCircleComponent } from './components/times-circle/times-circle.component';
import { TrashComponent } from './components/trash/trash.component';
import { PlusComponent } from './components/plus/plus.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FileComponent,
    FolderComponent,
    CheckComponent,
    CheckCircleComponent,
    TimesComponent,
    TimesCircleComponent,
    TrashComponent,
    PlusComponent
  ],
  exports: [
    FileComponent,
    FolderComponent,
    CheckComponent,
    CheckCircleComponent,
    TimesComponent,
    TimesCircleComponent,
    TrashComponent,
    PlusComponent
  ],
})
export class IconsModule {}
