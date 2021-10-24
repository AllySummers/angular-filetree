import { generateUUID, removeIndex, replaceIndex, deserializeNode } from '@aft/utils';
import type { AFT } from '..';
import type { IBaseNode } from './base-node.model';
import { BaseNodeModel } from './base-node.model';
import type { INode, NodeModel } from './node.model';

export interface IFolderNode extends IBaseNode {
  type: 'folder';
  children: Array<INode>;
}

export class FolderNodeModel extends BaseNodeModel {
  public readonly type: 'folder' = 'folder';

  constructor( public name: string, public children: Array<NodeModel>, public readonly id = generateUUID(), public parent?: FolderNodeModel ) {
    super();
  }

  toJSON() {
    const { type, children, name, id } = this;
    return { type, children, name, id };
  }

  addChild(child: NodeModel) {
    child.parent = this;

    this.children = [
      ...this.children,
      child
    ];
  }

  removeChild(...indexes: Array<number>) {
    this.children = removeIndex(this.children, ...indexes);
  }

  replaceChild(index: number, node: AFT.INode) {
    this.children = replaceIndex(this.children, index, deserializeNode(node));
  }

  modifyChild(index: number, replaceFn: (oldNode: AFT.Node) => AFT.INode) {
    this.children = replaceIndex(this.children, index, deserializeNode(replaceFn(this.children[index])));
  }
}
