import type { IFileNode, FileNodeModel } from './file-node.model';
import type { IFolderNode, FolderNodeModel } from './folder-node.model';

export type NodeModel = FileNodeModel | FolderNodeModel;

export type INode = IFileNode | IFolderNode;
