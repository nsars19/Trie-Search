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

  test("searches for values", () => {
    const trie = new Trie();
    const words = ["ace", "aced", "actor", "alfredo", "balloons"];
    words.forEach((word) => trie.add(word));

    expect(trie.search("a")).toEqual(["ace", "aced", "actor", "alfredo"]);
    expect(trie.search("ac")).toEqual(["ace", "aced", "actor"]);
    expect(trie.search("act")).toEqual(["actor"]);
  });

  test("maps values to a key", () => {
    const trie = new Trie();
    trie.map("Hello", "World");
    trie.map("Hello", "There");
    expect(trie.search("hello")).toEqual(["World", "There"]);
  });

  test("doesn't map empty strings", () => {
    const trie = new Trie();
    trie.add("");
    expect(trie.children).toEqual({});
  });

  test("maps & adds properly", () => {
    const trie = new Trie();
    trie.add("hello there");
    trie.map("hello", "world");

    expect(trie.search("hello")).toEqual(["world", "hello there"]);
  });

  test("deletes added values", () => {
    const trie = new Trie();
    trie.add("spaghetti");
    expect(trie.search("spaghet")).toEqual(["spaghetti"]);
    expect(trie.delete("spaghetti")).toEqual([]);
    expect(trie.search("spaghet")).toEqual([]);
  });

  test("deletes mapped values", () => {
    const trie = new Trie();
    trie.map("Hello", "there");
    trie.map("Hello", "world");
    trie.delete("hello");
    expect(trie.search("hello")).toEqual([]);
  });

  test("prunes deleted values", () => {
    const trie = new Trie();
    trie.map("Hello", "there");
    trie.map("Hello", "world");
    trie.delete("hello");
    expect(trie.children).toEqual({});
  });

  test("it doesn't prune existing values", () => {
    const trie = new Trie();
    trie.add("meat");
    trie.add("meatball");
    trie.delete("meat");
    expect(trie.search("m")).toEqual(["meatball"]);
  });

  test("returns an empty array when attempting to delete a missing value", () => {
    const trie = new Trie();
    trie.add("meatball");
    expect(trie.delete("meat")).toEqual([]);
    expect(trie.delete("meatbal")).toEqual([]);
    expect(trie.search("m")).toEqual(["meatball"]);
  });

  test("removes branch until it hits a node containing a value", () => {
    const trie = new Trie();
    ["ham", "hamster"].forEach((word) => trie.add(word));
    trie.delete("hamster");
    trie.prune("hamster");
    const childVal = trie.children["h"].children["a"].children["m"].children;
    expect(childVal).toEqual({});
  });

  test("deletes duplicates", () => {
    const trie = new Trie();
    ["ham", "ham"].forEach((word) => trie.add(word));
    trie.delete("ham");
    expect(trie.search("h")).toEqual([]);
  });
});
