import { completeWork } from "./completeWork";
import { beginWork } from './beginWork';
import { FiberNode } from "./fiber";
/* 采用深度优先遍历
*<Card>
*    <div>test</div>
*    <p>hello</p>
*</Card>
* 运行逻辑：先遍历<Card>，给beinWork传入<div>，遍历test，再遍历</div>传给completeWork，然后遍历div的兄弟<p>...
*/

let workInProgress: FiberNode | null = null;

function prepareFreshStack(fiber: FiberNode) {
    workInProgress = fiber;
}

function renderRoot(root: FiberNode) {
    // 初始化
    prepareFreshStack(root);
    do {
        try {
            workLoop();
            break;
        } catch (e) {
            console.error('workloop error', e);
            workInProgress = null;
        }
    } while(true);
}

function workLoop() {
    while(workInProgress !== null) {
        performUnitOfWork(workInProgress);
    }
}

function performUnitOfWork(fiber: FiberNode) {
    const next = beginWork(fiber);
    fiber.memorizedProps = fiber.pendingProps;
    // 如果next为null，说明已经遍历完没有子节点了，可以进行递归的归了
    if (next === null) {
        completeUnitOfWork(fiber);
    } else {
        workInProgress = next;
    }
}
function completeUnitOfWork(filber: FiberNode) {
    let node: FiberNode | null = filber;
    do {
        completeWork(node);
        const sibling = node.sibling;
        // 递归完成一个节点后再遍历兄弟节点
        if (sibling != null) {
            workInProgress = sibling;
            return;
        }
        // 返回上一节点
        node = node.return;
        workInProgress = node;
    } while(node !== null)
}