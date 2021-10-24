import { AFT } from '@aft/models';
import { removeIndex, unflattenNodes } from '@aft/utils';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileTreeService {
  private _nodes$ = new BehaviorSubject<Array<AFT.FlatNode>>([
    new AFT.FlatNode('folder', 'Node 1', 'node-1'),
    new AFT.FlatNode('file', 'Child 1', 'file-1', 'node-1'),
    new AFT.FlatNode('file', 'Child 2', 'file-2', 'node-1'),
    new AFT.FlatNode('folder', 'Folder 1', 'folder-1', 'node-1'),
    new AFT.FlatNode('folder', 'Folder 2', 'folder-2', 'node-1_folder-1'),
    new AFT.FlatNode('folder', 'Folder 3', 'folder-3', 'node-1_folder-1_folder-2'),
  ]);

  public readonly nodes$ = this._nodes$.asObservable()
    .pipe(
      map(nodes => unflattenNodes(nodes)),
    );

  public readonly json$ = this.nodes$.pipe(
    map(nodes => nodes.map(node => node.toJSON())),
  );

  addNode(node: AFT.INode | AFT.Node, path: Array<string> = []) {
    const parent = path.join('_');

    const newNode = new AFT.FlatNode(
      node.type,
      node.name,
      node.id,
      parent
    );

    this._nodes$.next([
      ...this._nodes$.getValue(),
      newNode
    ]);
  }

  removeNode(id: string) {
    const value = this._nodes$.getValue();
    const nodeToRemoveIndex = value.findIndex(node => node.id === id);

    if (nodeToRemoveIndex === -1) throw new Error(`No node exists with ID '${id}'.`);

    const indexesToRemove: Array<number> = [
      nodeToRemoveIndex
    ];

    value.forEach((node, index) => {
      if (node.parent?.includes(id)) indexesToRemove.push(index);
    });

    this._nodes$.next(
      removeIndex(
        this._nodes$.getValue(),
        ...indexesToRemove
      )
    );
  }
}
