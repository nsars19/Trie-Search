const TrieNode = require("./node");

function Trie() {
  this.root = null;
  this.children = {};
}

Trie.prototype.add = function (data) {
  let curr = this;

  for (const char of data) {
    // If the child node already exists we skip the letter
    if (curr.children[char]) {
      curr = curr.children[char];
    } else {
      // Build on top of preexisting nodes
      const val = curr.val ? curr.val + char : char;
      curr.children[char] = new TrieNode(val);
      curr = curr.children[char];
    }
  }
};

Trie.prototype.search = function (data) {
  let curr = this;
  let node;

  for (const char of data) {
    if (curr.children[char]) {
      curr = curr.children[char];
    }
  }
};

module.exports = Trie;
