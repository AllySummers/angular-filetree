import { generateUUID } from '@aft/utils';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileTreeService } from './services/file-tree/file-tree.service';

@Component({
  selector: 'aft-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  showControl = false;
  nodes$ = this.fileTree.nodes$;
  json$ = this.fileTree.json$;
  folderName = new FormControl(null, [Validators.required, Validators.minLength(1)]);

  constructor( private fileTree: FileTreeService ) {}

  addFolder(event: Event) {
    event.preventDefault();
    const { value } = this.folderName;
    if (typeof value === 'string') {
      this.fileTree.addNode({
        type: 'folder',
        name: value,
        children: [],
        id: generateUUID()
      });

      this.folderName.setValue('');
      this.showControl = false;
    }
  }

  showFolderControl() {
    this.showControl = true;
  }

  cancelAddFolder() {
    this.folderName.setValue('');
    this.showControl = false;
  }
}
