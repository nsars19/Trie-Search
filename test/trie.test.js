const { expect, test, describe } = require("@jest/globals");
const Trie = require("../src/trie");

describe("Trie", () => {
  test("returns an object", () => {
    const trie = new Trie();
    expect(typeof trie).toBe("object");
  });

  test("adds properly", () => {
    const trie = new Trie();
    trie.add("Hi");
    const childVal = trie.children["h"].children["i"].val[0];
    expect(childVal).toBe("Hi");
  });
});
