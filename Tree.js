//import TreeNode from "./TreeNode";

class Tree {

    constructor() {
        this.root = null;
    }

    insert(value) {
        let node;
        if (this.root == null) {
            node = this.root = new TreeNode(value);
        } else {
            node = this.root.insert(value);
        }
        console.log("-");

        printTitle("Insert " + value)
        paintTree(this);

        return node;
    }

    remove(value) {
        if (this.root != null) {
            this.root.remove(value);

            if (this.root.value == undefined) {
                this.root = null;
            }
        }

        printTitle("Delete " + value)
        paintTree(this);

    }


    traversePreOrder() {
        if (this.root)
            return this.root.traverse(Traverse.PreOrder);
        return [];
    }

    traverseInOrder() {
        if (this.root)
            return this.root.traverse(Traverse.InOrder);
        return [];
    }

    traversePostOrder() {
        if (this.root)
            return this.root.traverse(Traverse.PostOrder);
        return [];
    }

    array() {
        if (this.root == null) return [];

        let rtn = [];

        /**
         * make array
         * @param {number} p parent index
         * @param {number} d 1 = left, 2 = right
         * @param {TreeNode} target the target tree node
         */
        function make(p, d, target) {
            if (target == null) return;

            let this_p = 2 * p + d;
            rtn[this_p] = target.value;
            make(this_p, 1, target.left);
            make(this_p, 2, target.right);
        }

        rtn[0] = this.root.value;

        make(0, 1, this.root.left);
        make(0, 2, this.root.right);

        return rtn;

    }

}