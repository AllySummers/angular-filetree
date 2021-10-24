import type { AFT } from '@aft/models';

export function getParentPath(node: AFT.Node) {
  let currentChild: AFT.Node | undefined = node;
  const path: Array<string> = [];

  while (typeof currentChild !== 'undefined') {
    if (currentChild.parent) path.push(currentChild.parent.id);
    currentChild = currentChild.parent;
  }

  return path;
}
