import { generateUUID } from '@aft/utils';

export interface IBaseNode {
  type: 'file' | 'folder';
  name: string;
  id: string;
}

export abstract class BaseNodeModel<T extends IBaseNode = IBaseNode> implements IBaseNode {
  public readonly id = generateUUID();

  public abstract readonly type: 'file' | 'folder';
  public abstract name: string;

  public abstract toJSON(): T;
}
