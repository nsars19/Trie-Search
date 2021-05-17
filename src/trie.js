const TrieNode = require("./node");

function Trie() {
  this.root = true;
  this.children = {};
}

Trie.prototype.add = function (data) {
  if (!data) return;

  let curr = this;

  for (let char of data) {
    char = char.toLowerCase();
    // If the child node already exists we skip the letter
    if (curr.children[char]) {
      curr = curr.children[char];
    } else {
      // Build on top of preexisting nodes
      const key = curr.key ? curr.key + char : char;
      curr.children[char] = new TrieNode(key);
      curr = curr.children[char];
    }
  }

  curr.val = curr.val.concat(data);
};

Trie.prototype.map = function (key, value) {
  if (!value) return;
  key = key.toLowerCase();
  let curr = this;

  for (const char of key) {
    if (curr.children[char]) {
      curr = curr.children[char];
    } else {
      const nodeKey = curr.key ? curr.key + char : char;
      curr.children[char] = new TrieNode(nodeKey);
      curr = curr.children[char];
    }
  }

  curr.val = curr.val.concat(value);
};

Trie.prototype.delete = function (data) {
  data = data.toLowerCase();
  let curr = this;

  for (const char of data) {
    if (curr.children[char]) {
      curr = curr.children[char];
    }
  }

  curr.val = [];
  this.prune(data);
  return [];
};

Trie.prototype.deleteNode = function (data) {
  data = data.toLowerCase();
  let curr = this;
  let prev;
  let charKey;

  for (const char of data) {
    if (curr.children[char]) {
      prev = curr;
      charKey = char;
      curr = curr.children[char];
    }
  }

  delete prev.children[charKey];
};

Trie.prototype.prune = function (data) {
  data = data.toLowerCase();
  let curr = this;
  let prev;
  let charKey;

  for (const char of data) {
    if (curr.children[char]) {
      prev = curr;
      charKey = char;
      curr = curr.children[char];
    }
  }

  if (curr.root || !curr.isLeaf()) {
    return;
  } else if (curr.val.length > 0) {
    return;
  } else {
    delete prev.children[charKey];
  }

  this.prune(data);
};

Trie.prototype.search = function (data) {
  const first = data[0];
  const vals = [];
  let curr = this;

  if (!curr.children[first]) return vals;

  for (const char of data) {
    if (curr.children[char]) {
      curr = curr.children[char];
    }
  }

  return addChildVals(curr, vals);
};

function addChildVals(node, vals) {
  if (node.val.length) vals.push(...node.val);

  if (node.isLeaf()) return vals;

  for (let key in node.children) {
    const child = node.children[key];
    addChildVals(child, vals);
  }

  return vals;
}

module.exports = Trie;
