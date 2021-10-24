import { AFT } from '@aft/models';

function flatNodeToNode(node: AFT.IFlatNode): AFT.Node {
  return node.type === 'folder'
    ? new AFT.FolderNode(node.name, [], node.id)
    : new AFT.FileNode(node.name, node.id);
}

function getNodeParentCount(node: AFT.FlatNode | AFT.IFlatNode | string) {
  const parent = typeof node === 'string' ? node : node.parent;
  return parent ? (parent.match(/_/g)?.length ?? 0) + 1 : 0;
}

function getMostNested(nodes: Array<AFT.FlatNode | AFT.IFileNode>) {
  return nodes
    .reduce((acc, cur) => {
      const parents = getNodeParentCount(cur);
      return parents > acc ? parents : acc;
    }, 0);
}

function getLastParentID(parent: string) {
  const lastIndex = parent.lastIndexOf('_');
  if (lastIndex === -1) return parent;
  else return parent.slice(lastIndex + 1);
}

export function unflattenNodes(nodes: Array<AFT.IFlatNode | AFT.IFlatNode>): Array<AFT.Node> {
  const classNodes = nodes
    .map(
      node =>
        node instanceof AFT.FlatNode
          ? node
          : new AFT.FlatNode(node.type, node.name, node.parent, node.id)
    );

  const groupedByParents = Array.from(new Array(getMostNested(classNodes) + 1))
    .map((_, index) => classNodes.filter(node => getNodeParentCount(node) === index));

  const groupedNodes = groupedByParents
    .map(nodeArr => nodeArr.map(flatNodeToNode));

  for (let arrIndex = groupedByParents.length - 1; arrIndex >= 0; arrIndex--) {
    const nodesArr = groupedByParents[arrIndex];
    nodesArr.forEach((node, nodeIndex) => {
      const { parent: nodeParent } = node;
      if (nodeParent) {
        const lastParentID = getLastParentID(nodeParent);
        const parent = groupedNodes[arrIndex - 1]
          .find(par => par.id === lastParentID);

        if (!parent) throw new Error(`Cannot find parent with ID: '${lastParentID}'.`);
        if (parent.type === 'file') throw new Error(`Node with ID '${node.id}' cannot be a child of node with ID '${parent.id}' as the parent node is a file node.`);
        parent.addChild(groupedNodes[arrIndex][nodeIndex]);
      }

      if (typeof nodeParent === 'undefined' && nodeIndex > 0) throw new Error(`Node with ID '${node.id}' should have a parent.`);
    });
  }

  return groupedNodes[0];
}
