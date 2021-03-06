function TrieNode(key, val = []) {
  this.key = key;
  this.val = val;
  this.children = {};
}

TrieNode.prototype.isLeaf = function () {
  return Object.keys(this.children).length === 0;
};

module.exports = TrieNode;
