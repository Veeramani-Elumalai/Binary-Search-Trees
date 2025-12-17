import { Tree } from "./bst.mjs";

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

console.log("Find 42:", tree.find(42));
console.log("Find 8:", tree.find(8));
console.log("Find 1000:", tree.find(1000));

// ---------- 2. Confirm tree is balanced ----------
console.log("\nIs tree balanced?", tree.isBalanced());

// ---------- 3. Print traversals ----------
const levelOrder = [];
tree.levelOrderForEach(node => {
  levelOrder.push(node.data);
})
console.log(`Level Order Traversal :${levelOrder}`);

const inOrder = [];
tree.inOrderForEach(node => {
  inOrder.push(node.data);
});
console.log(`Inorder Traversal :${inOrder}`);

const preOrder = [];
tree.preOrderForEach(node => {
  preOrder.push(node.data);
});
console.log(`Preorder Traversal :${preOrder}`);

const postOrder = [];
tree.postOrderForEach(node => {
  postOrder.push(node.data);
});
console.log(`Postorder Traversal :${postOrder}`);

// ---------- 4. Unbalance the tree (add values > 100) ----------
tree.insert(101);
tree.insert(150);
tree.insert(200);
tree.insert(300);

// ---------- 5. Confirm tree is unbalanced ----------
console.log("\nIs tree balanced after inserts?", tree.isBalanced());

// ---------- 6. Rebalance the tree ----------
tree.rebalance();

// ---------- 7. Confirm tree is balanced again ----------
console.log("\nIs tree balanced after rebalance?", tree.isBalanced());

// ---------- 8. Print traversals again ----------

// ---------- 8. Print traversals again (after rebalance) ----------

levelOrder.length = 0;
inOrder.length = 0;
preOrder.length = 0;
postOrder.length = 0;

tree.levelOrderForEach(node => {
  levelOrder.push(node.data);
});
console.log(`Level Order Traversal (rebalanced): ${levelOrder}`);

tree.inOrderForEach(node => {
  inOrder.push(node.data);
});
console.log(`Inorder Traversal (rebalanced): ${inOrder}`);

tree.preOrderForEach(node => {
  preOrder.push(node.data);
});
console.log(`Preorder Traversal (rebalanced): ${preOrder}`);

tree.postOrderForEach(node => {
  postOrder.push(node.data);
});
console.log(`Postorder Traversal (rebalanced): ${postOrder}`);
