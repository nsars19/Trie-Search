A simple trie implementation.

```js
import Trie from "simple-trie-search";
// OR
const Trie = require("simple-trie-search");

// Add words by passing in a String, or by passing an Array.
Trie.add("hello");
Trie.search("h");
// [ 'Hello' ]

Trie.add("help");
Trie.search("he");
// [ 'help', 'hello' ]

Trie.add(["a", "list", "of", "words"]);

// Values can be mapped to keys as well.
// Map values can be of any type.
Trie.map("keyword", "value");
Trie.search("key");
// [ 'value' ]

Trie.map("hello", { world: "world", there: "there" });
Trie.search("hello");
// [{ world: 'world', there: 'there' }]

// To delete a value, pass that value as an argument to the delete method.
Trie.add("hello");
Trie.delete("hello");
Trie.search("hello");
// [ ]

// To delete a node and its children, pass its key as an argument to the deleteNode method.
Trie.add(["meat", "me", "mean", "mat"]);
Trie.deleteNode("me");
// [ 'mat' ]
```
