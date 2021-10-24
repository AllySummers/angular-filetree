import { AFT } from '@aft/models';

export function deserializeFileNode({ name, id }: AFT.IFileNode): AFT.FileNode {
  return new AFT.FileNode(name, id);
}

export function deserializeFolderNode({ name, id, children }: AFT.IFolderNode): AFT.FolderNode {
  return new AFT.FolderNode(
    name,
    children.map(deserializeNode),
    id,
  );
}

type DeserializeNodeReturn<T extends AFT.IFileNode | AFT.IFolderNode> =
  T extends AFT.IFileNode
    ? AFT.FileNode
  : T extends AFT.IFolderNode
    ? AFT.FolderNode
  : never;

export function deserializeNode<T extends AFT.IFileNode | AFT.IFolderNode>(node: T): DeserializeNodeReturn<T> {
  const deserialized = node.type === 'file'
    ? deserializeFileNode(node)
    : deserializeFolderNode(node);

  if (deserialized.type !== node.type) throw new Error(
    `deserializeNode incorrectly converted the given node:
    ${JSON.stringify(deserialized.toJSON(), null, 2)}`
  );

  return deserialized as DeserializeNodeReturn<T>;
}

export function deserializeNodes(nodes: Array<AFT.INode>): Array<AFT.Node> {
  return nodes.map(deserializeNode);
}
