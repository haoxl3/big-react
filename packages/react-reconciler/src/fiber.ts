import {Props, Key, Ref} from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';

export class FiberNode {
    type: any;
    tag: WorkTag;
    pendingProps: Props;
    key: Key;
    stateNode: any;
    ref: Ref;

    return: FiberNode | null;
    sibling: FiberNode | null;
    child: FiberNode | null;
    index: number;
    memorizedProps: Props | null;
    alternate: FiberNode | null;
    flags: Flags;
    constructor(tag: WorkTag, pendingProps: Props, key: Key) {
        // 实例
        this.tag = tag;
        this.key = key;
        this.stateNode = null;
        this.type = null;

        // 构成树状结构
        // 指向父fiberNode
        this.return = null;
        // 指向兄弟fiberNode
        this.sibling = null;
        // 指向子fiberNode
        this.child = null;
        this.index = 0;
        this.ref = null;

        // 作为工作单元
        this.pendingProps = pendingProps;
        this.memorizedProps = null;
        
        this.alternate = null;
        // 副作用，标记是增、删、改
        this.flags = NoFlags;
    }
}