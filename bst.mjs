class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
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

  find(value, node = this.root){
    if (node === null) return null;
    if (node.data === value) return node;

    if(value < node.data) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    if (this.root === null) return;

    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      const current = queue.shift();

      callback(current);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  }

  inOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    if (node === null) return;
    this.inOrderForEach(callback, node.left);
    callback(node);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (typeof callback !== 'function') {
      throw new Error("Callback function is required");
    }

    if (node === null) return;
    callback(node);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if ( typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    if(node === null) return;
    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node);
  }

  height(node = this.root) {
    if (node === null) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, node = this.root, level = 0) {
    if (node === null) return null;

    if (node.data === value) return level;

    if (value < node.data) {
      return this.depth(value, node.left, level + 1);
    } else {
      return this.depth(value, node.right, level + 1);
    }
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return (
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

rebalance() {
  const values = [];

  this.inOrderForEach(node => {
    values.push(node.data);
  });

  this.root = this.buildTree(values);
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
// const tree = new Tree([
//   1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324
// ]);

// console.log("Before insert:");
// tree.prettyPrint();

// tree.insert(42);

// console.log("\nAfter insert:");
// tree.prettyPrint();

// tree.delete(8);

// console.log("\nAfter deleting 42:");
// tree.prettyPrint();

// console.log("Find 42:", tree.find(42));
// console.log("Find 8:", tree.find(8));
// console.log("Find 1000:", tree.find(1000));

// const bfs = [];
// tree.levelOrderForEach(node => {
//   bfs.push(node.data);
// })
// console.log(`Level Order Traversal :${bfs}`);

// const inOrder = [];
// tree.inOrderForEach(node => {
//   inOrder.push(node.data);
// });
// console.log(`Inorder Traversal :${inOrder}`);

// const preOrder = [];
// tree.preOrderForEach(node => {
//   preOrder.push(node.data);
// });
// console.log(`Preorder Traversal :${preOrder}`);

// const postOrder = [];
// tree.postOrderForEach(node => {
//   postOrder.push(node.data);
// });
// console.log(`Postorder Traversal :${postOrder}`);

// console.log(tree.height(8));

// console.log(tree.isBalanced());

console


