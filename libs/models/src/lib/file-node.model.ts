import { generateUUID } from '@aft/utils';
import type { IBaseNode } from './base-node.model';
import { BaseNodeModel } from './base-node.model';
import type { FolderNodeModel } from './folder-node.model';

export interface IFileNode extends IBaseNode {
  type: 'file';
}

export class FileNodeModel extends BaseNodeModel<IFileNode> {
  public readonly type: 'file' = 'file';

  constructor( public name: string, public readonly id = generateUUID(), public parent?: FolderNodeModel ) {
    super();
  }

  toJSON() {
    const { type, name, id } = this;
    return { type, name, id };
  }
}
