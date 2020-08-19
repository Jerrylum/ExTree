class Traverse {
    static PreOrder = Symbol();
    static InOrder = Symbol();
    static PostOrder = Symbol();
}

class TreeNode {
    constructor(value, parent = null) {
        this.left = null;
        this.right = null;
        this.parent = parent; // null = root
        this.value = value;
    }

    /**
     * @return {number}
     */
    get leftHeight() {
        if (!this.left) {
            return 0;
        }

        return this.left.height + 1;
    }

    /**
     * @return {number}
     */
    get rightHeight() {
        if (!this.right) {
            return 0;
        }

        return this.right.height + 1;
    }

    /**
     * @return {number}
     */
    get height() {
        return Math.max(this.leftHeight, this.rightHeight);
    }

    /**
     * @return {number}
     */
    get balanceFactor() {
        return this.leftHeight - this.rightHeight;
    }

    insert(value) {
        let node;

        if (Comparator.isLessThan(value, this.value)) {
            if (this.left == null) {
                node = this.left = new TreeNode(value, this);
            } else {
                node = this.left.insert(value);
            }
        } else {
            if (this.right == null) {
                node = this.right = new TreeNode(value, this);
            } else {
                node = this.right.insert(value);
            }
        }

        return node;
    }

    remove(value) {
        const nodeToRemove = this.find(value);

        if (!nodeToRemove) {
            throw new Error('Item not found in the tree');
        }

        const { parent } = nodeToRemove; // const parent = nodeToRemove.parnent;

        if (!nodeToRemove.left && !nodeToRemove.right) {
            // Node is a leaf and thus has no children.
            if (parent) {
                // Node has a parent. Just remove the pointer to this node from the parent.
                parent.removeChild(nodeToRemove);
            } else {
                // Node has no parent. Just erase current node value.
                nodeToRemove.setValue(undefined); // Root, with be set to null
            }
        } else if (nodeToRemove.left && nodeToRemove.right) {
            // Node has two children.
            // Find the next biggest value (minimum value in the right branch)
            // and replace current value node with that next biggest value.
            const nextBiggerNode = nodeToRemove.right.findMin();
            if (!(nextBiggerNode.value == nodeToRemove.right.value)) {
                this.remove(nextBiggerNode.value);
                nodeToRemove.setValue(nextBiggerNode.value);
            } else {
                // In case if next right value is the next bigger one and it doesn't have left child
                // then just replace node that is going to be deleted with the right node.
                nodeToRemove.setValue(nodeToRemove.right.value);
                nodeToRemove.setRight(nodeToRemove.right.right);
            }
        } else {
            // Node has only one child.
            // Make this child to be a direct child of current node's parent.
            /** @var BinarySearchTreeNode */
            const childNode = nodeToRemove.left || nodeToRemove.right;

            if (parent) {
                parent.replaceChild(nodeToRemove, childNode);
            } else {
                BinaryTreeNode.copyNode(childNode, nodeToRemove);
            }
        }

        // Clear the parent of removed node.
        nodeToRemove.parent = null;

        return true;
    }

    /**
     * @param {*} value
     * @return {BinaryTreeNode}
     */
    setValue(value) {
        this.value = value;

        return this;
    }

    /**
     * @param {BinaryTreeNode} node
     * @return {BinaryTreeNode}
     */
    setLeft(node) {
        // Reset parent for left node since it is going to be detached.
        if (this.left) {
            this.left.parent = null;
        }

        // Attach new node to the left.
        this.left = node;

        // Make current node to be a parent for new left one.
        if (this.left) {
            this.left.parent = this;
        }

        return this;
    }

    /**
     * @param {BinaryTreeNode} node
     * @return {BinaryTreeNode}
     */
    setRight(node) {
        // Reset parent for right node since it is going to be detached.
        if (this.right) {
            this.right.parent = null;
        }

        // Attach new node to the right.
        this.right = node;

        // Make current node to be a parent for new right one.
        if (node) {
            this.right.parent = this;
        }

        return this;
    }

    removeChild(nodeToRemove) {
        if (this.left && this.left.value == nodeToRemove.value) {
            this.left = null;
            return true;
        }

        if (this.right && this.right.value == nodeToRemove.value) {
            this.right = null;
            return true;
        }

        return false;
    }

    /**
     * @param {BinaryTreeNode} nodeToReplace
     * @param {BinaryTreeNode} replacementNode
     * @return {boolean}
     */
    replaceChild(nodeToReplace, replacementNode) {
        if (!nodeToReplace || !replacementNode) {
            return false;
        }

        if (this.left && this.left.value ==  nodeToReplace.value) {
            this.left = replacementNode;
            return true;
        }

        if (this.right && this.right.value ==  nodeToReplace.value) {
            this.right = replacementNode;
            return true;
        }

        return false;
    }


    find(value) {
        if (value == this.value) {
            return this;
        }
        if (Comparator.isLessThan(value, this.value) && this.left) {
            return this.left.find(value);
        }
        if (this.right) {
            return this.right.find(value);
        }
        return null;
    }

    findMin() {
        if (!this.left) {
            return this;
        }

        return this.left.findMin();
    }

    /**
     * @param {BinaryTreeNode} sourceNode
     * @param {BinaryTreeNode} targetNode
     */
    static copyNode(sourceNode, targetNode) {
        targetNode.setValue(sourceNode.value);
        targetNode.setLeft(sourceNode.left);
        targetNode.setRight(sourceNode.right);
    }

    traverse(orderType = InOrder) {
        let traverse = [];

        if (orderType == Traverse.PreOrder) traverse.push(this.value);

        // Add left node.
        if (this.left) {
            traverse = traverse.concat(this.left.traverse(orderType));
        }

        if (orderType == Traverse.InOrder) traverse.push(this.value);

        // Add right node.
        if (this.right) {
            traverse = traverse.concat(this.right.traverse(orderType));
        }

        if (orderType == Traverse.PostOrder) traverse.push(this.value);

        return traverse;
    }
}
