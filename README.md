A simple trie implementation.

```js
import Trie from "simple-trie-search";
// OR
const Trie = require("simple-trie-search");

// Instantiate a Trie object
const trie = new Trie()

// Add words by passing in a String, or by passing an Array.
trie.add("hello");
trie.search("h");
// [ 'Hello' ]

trie.add("help");
trie.search("he");
// [ 'help', 'hello' ]

trie.add(["a", "list", "of", "words"]);

// Values can be mapped to keys as well.
// Map values can be of any type.
trie.map("keyword", "value");
trie.search("key");
// [ 'value' ]

trie.map("hello", { world: "world", there: "there" });
trie.search("hello");
// [{ world: 'world', there: 'there' }]

// To delete a value, pass that value as an argument to the delete method.
trie.add("hello");
trie.delete("hello");
trie.search("hello");
// [ ]

// To delete a node and its children, pass its key as an argument to the deleteNode method.
trie.add(["meat", "me", "mean", "mat"]);
trie.deleteNode("me");
// [ 'mat' ]
```
