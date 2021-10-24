import type { AFT } from '@aft/models';

export function serializeFileNode(node: AFT.FileNode): AFT.IFileNode {
  return node.toJSON();
}

export function serializeFolderNode(node: AFT.FolderNode): AFT.IFolderNode {
  return {
    ...node.toJSON(),
    children: node.children.map(serializeNode)
  };
}

type SerializeNodeReturn<T extends AFT.FileNode | AFT.FolderNode> =
  T extends AFT.FileNode
    ? AFT.IFileNode
  : T extends AFT.FolderNode
    ? AFT.IFolderNode
  : never;

export function serializeNode<T extends AFT.FileNode | AFT.FolderNode>(node: T): SerializeNodeReturn<T> {
  const serialized = node.type === 'file'
    ? serializeFileNode(node)
    : serializeFolderNode(node);

  if (serialized.type !== node.type) throw new Error(
    `deserializeNode incorrectly converted the given node:
    ${JSON.stringify(serialized, null, 2)}`
  );
  return serialized as SerializeNodeReturn<T>;
}

export function serializeNodes(nodes: Array<AFT.Node>): Array<AFT.INode> {
  return nodes.map(serializeNode);
}
