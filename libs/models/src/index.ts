import { BaseNodeModel } from './lib/base-node.model';
import { FileNodeModel } from './lib/file-node.model';
import { FolderNodeModel } from './lib/folder-node.model';
import type { NodeModel, INode as NodeType } from './lib/node.model';
import type { IBaseNode as BaseNodeType } from './lib/base-node.model';
import type { IFileNode as FileNodeType } from './lib/file-node.model';
import type { IFolderNode as FolderNodeType } from './lib/folder-node.model';

import type { IFlatNode as FlatNodeType } from './lib/flat-node.model';
import { FlatNode as FlatNodeModel } from './lib/flat-node.model';

export * from './lib/base-node.model';
export * from './lib/file-node.model';
export * from './lib/folder-node.model';
export * from './lib/node.model';
export * from './lib/flat-node.model';

export namespace AFT {
  export const BaseNode = BaseNodeModel;
  export const FileNode = FileNodeModel;
  export const FolderNode = FolderNodeModel;

  export type IBaseNode = BaseNodeType;
  export type IFileNode = FileNodeType;
  export type IFolderNode = FolderNodeType;
  export type INode = NodeType;

  export type BaseNode = BaseNodeModel;
  export type FileNode = FileNodeModel;
  export type FolderNode = FolderNodeModel;
  export type Node = NodeModel;

  export type IFlatNode = FlatNodeType;
  export type FlatNode = FlatNodeModel;
  export const FlatNode = FlatNodeModel;
}
