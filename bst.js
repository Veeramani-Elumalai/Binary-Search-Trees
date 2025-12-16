class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const unique = this.removeDuplicates(sorted);
    this.root = this.buildTree(unique);
  }

  removeDuplicates(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (!result.includes(arr[i])) {
        result.push(arr[i]);
      }
    }
    return result;
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }

  insert(value) {
    this.root = this._insert(this.root, value);
  }

  _insert(root, value) {
    if (root === null) return new Node(value);

    if (value < root.data) {
      root.left = this._insert(root.left, value);
    } else if (value > root.data) {
      root.right = this._insert(root.right, value);
    }

    return root;
  }

  delete(value) {
    this.root = this._delete(this.root, value);
  }

  _delete(root, value) {
    if (root === null) return null;
    if (value > root.data) {
      root.right = this._delete(root.right, value);
    }else if (value < root.data) {
      root.left = this._delete(root.left, value);
    }else {
      if(root.left && root.right === null) return null;

      if(root.left === null) return root.right;

      if(root.right === null) return root.left;

      let sucessor =  this._minValueNode(root.right);
      root.data = sucessor.data;
      root.right = this._delete(root.right, sucessor.data);
    }    
    return root;
  }

  _minValueNode(node) {
    let current = node;
    while(current.left !== null){
      current = current.left;
    }
    return current;
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) return;

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

    if (node.left !== null) {
      this.prettyPrint(
        node.left,
        `${prefix}${isLeft ? '    ' : '│   '}`,
        true
      );
    }
  }
}

/* ===== TEST ===== */
const tree = new Tree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324
]);

console.log("Before insert:");
tree.prettyPrint();

tree.insert(42);

console.log("\nAfter insert:");
tree.prettyPrint();

tree.delete(8);

console.log("\nAfter deleting 42:");
tree.prettyPrint();



