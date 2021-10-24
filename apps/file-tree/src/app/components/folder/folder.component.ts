import { AFT } from '@aft/models';
import { generateUUID, getParentPath } from '@aft/utils';
import type { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileTreeService } from '../../services/file-tree/file-tree.service';

@Component({
  selector: 'aft-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  @Input() folder!: AFT.FolderNode;
  @Input() rootItem = false;

  showItemType = false;
  showItemName = false;

  newItemType: 'file' | 'folder' | null = null;

  newItemName = new FormControl(null, [Validators.required, Validators.minLength(1)]);

  constructor( private fileTree: FileTreeService ) {}

  ngOnInit() {
    if (!this.folder) throw new Error('The component `<aft-folder>` requires the `folder` attribute to be set.');
  }

  removeItem() {
    this.fileTree.removeNode(this.folder.id);
  }

  addItemType() {
    this.showItemType = true;
  }

  addItemName() {
    this.showItemType = false;
    this.showItemName = true;
  }

  setTypeFolder() {
    this.newItemType = 'folder';
    this.addItemName();
  }

  setTypeFile() {
    this.newItemType = 'file';
    this.addItemName();
  }

  closeAddItem() {
    this.showItemName = false;
    this.showItemType = false;
    this.newItemName.setValue(null);
    this.newItemType = null;
  }

  submitItem(event: Event) {
    event.preventDefault();

    const path = [ ...getParentPath(this.folder), this.folder.id ];
    const { value: name } = this.newItemName;

    if (this.newItemType !== null) {
      const newNode: AFT.INode = this.newItemType === 'file'
        ? {
          type: 'file',
          name,
          id: generateUUID()
        }
        : {
          type: 'folder',
          name,
          children: [],
          id: generateUUID()
        };

      this.fileTree.addNode(newNode, path);

      this.closeAddItem();
    }

  }
}
