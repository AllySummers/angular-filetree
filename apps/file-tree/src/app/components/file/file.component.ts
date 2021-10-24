import { AFT } from '@aft/models';
import type { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { FileTreeService } from '../../services/file-tree/file-tree.service';

@Component({
  selector: 'aft-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  constructor( private fileTree: FileTreeService ) {}

  @Input() file!: AFT.FileNode;
  @Input() rootItem = false;

  ngOnInit() {
    if (!this.file) throw new Error('The component `<aft-file>` requires the `file` attribute to be set.');
  }

  removeItem() {
    this.fileTree.removeNode(this.file.id);
  }
}
