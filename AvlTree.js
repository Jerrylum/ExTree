class AvlTree extends Tree {
    insert(value) {
        let node = super.insert(value);

        let currentNode = node;
        while (currentNode) {
            this.balance(currentNode);
            currentNode = currentNode.parent;
        }
        return node;
    }

    remove(value) {
        super.remove(value);
        this.balance(this.root);
    }

    balance(node) {
        if (node == null) return;

        if (node.balanceFactor > 1) {
            if (node.left.balanceFactor > 0) {
                this.rotateR(node);
            } else if (node.left.balanceFactor < 0) {
                this.rotateL(node.left);
                this.rotateR(node);
            }

            // TEST, for delete
            else {
                this.rotateR(node);
            }

        } else if (node.balanceFactor < -1) {
            if (node.right.balanceFactor < 0) {
                this.rotateL(node);
            } else if (node.right.balanceFactor > 0) {
                this.rotateR(node.right);
                this.rotateL(node);
            }

            // TEST, for delete
            else {
                this.rotateL(node);
            }
        }
    }

    rotateR(rootNode) {
        // Detach left node from root node.
        const leftNode = rootNode.left;
        rootNode.setLeft(null);

        // Make left node to be a child of rootNode's parent.
        if (rootNode.parent) {
            if (rootNode.parent.left == rootNode)
                rootNode.parent.setLeft(leftNode);
            else
                rootNode.parent.setRight(leftNode);
        } else if (rootNode === this.root) {
            // If root node is root then make left node to be a new root.
            this.root = leftNode;
        }

        // If left node has a right child then detach it and
        // attach it as a left child for rootNode.
        if (leftNode.right) {
            rootNode.setLeft(leftNode.right);
        }

        // Attach rootNode to the right of leftNode.
        leftNode.setRight(rootNode);


        paintTree(this, "R-rotate at " + rootNode.value);
    }

    rotateL(rootNode) {
        // Detach right node from root node.
        const rightNode = rootNode.right;
        rootNode.setRight(null);

        // Make right node to be a child of rootNode's parent.
        if (rootNode.parent) {
            if (rootNode.parent.right == rootNode)
                rootNode.parent.setRight(rightNode);
            else
                rootNode.parent.setLeft(rightNode);
        } else if (rootNode === this.root) {
            // If root node is root then make right node to be a new root.
            this.root = rightNode;
        }

        // If right node has a left child then detach it and
        // attach it as a right child for rootNode.
        if (rightNode.left) {
            rootNode.setRight(rightNode.left);
        }

        // Attach rootNode to the left of rightNode.
        rightNode.setLeft(rootNode);

        paintTree(this, "L-rotate at " + rootNode.value);
    }
}