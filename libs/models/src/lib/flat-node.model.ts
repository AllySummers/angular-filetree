import { generateUUID } from '@aft/utils';

export type INodeType = 'file' | 'folder';

export interface IFlatNode {
  type: INodeType;
  name: string;
  id: string;
  parent?: string;
}

export class FlatNode implements IFlatNode {
  constructor( public type: INodeType, public name: string, public id = generateUUID(), public parent?: string ) {}
}
