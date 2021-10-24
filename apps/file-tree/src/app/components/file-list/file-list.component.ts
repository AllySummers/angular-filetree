import { Component, Input } from '@angular/core';
import type { AFT } from '@aft/models';

@Component({
  selector: 'aft-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent{
  @Input() rootItem = false;
  @Input() nodes: Array<AFT.Node> = [];
}
