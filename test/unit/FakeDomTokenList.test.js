import { assertEquals } from "asserts";
import { FakeDomTokenList } from "../../src/FakeDomTokenList.js";

Deno.test({
	name: "length",
	fn() {
		const list = new FakeDomTokenList();
		list.add("a", "b", "c");
		assertEquals(list.length, 3);
	},
});

Deno.test({
	name: "value",
	fn() {
		const list = new FakeDomTokenList();
		list.add("a", "b", "c");
		assertEquals(list.value, "a b c");
	},
});

Deno.test({
	name: "remove",
	fn() {
		const list = new FakeDomTokenList();
		list.add("a", "b", "c");
		list.remove("a", "c");
		assertEquals(list.value, "b");
	},
});

Deno.test({
	name: "toggle()",
	fn() {
		const list = new FakeDomTokenList();
		list.add("a", "b", "c");
		list.toggle("b");
		assertEquals(list.value, "a c");
	},
});

Deno.test({
	name: "toggle() true when doesn't exist yet",
	fn() {
		const list = new FakeDomTokenList();
		list.add("a", "c");
		list.toggle("b", true);
		assertEquals(list.value, "a c b");
	},
});

Deno.test({
	name: "toggle() true when it already exists",
	fn() {
		const list = new FakeDomTokenList();
		list.add("a", "b", "c");
		list.toggle("b", true);
		assertEquals(list.value, "a b c");
	},
});

Deno.test({
	name: "toggle() false when it already doesn't exists",
	fn() {
		const list = new FakeDomTokenList();
		list.add("a", "c");
		list.toggle("b", false);
		assertEquals(list.value, "a c");
	},
});

Deno.test({
	name: "toggle() false when it exists",
	fn() {
		const list = new FakeDomTokenList();
		list.add("a", "b", "c");
		list.toggle("b", false);
		assertEquals(list.value, "a c");
	},
});

Deno.test({
	name: "contains() true",
	fn() {
		const list = new FakeDomTokenList();
		list.add("a", "b", "c");
		assertEquals(list.contains("b"), true);
	},
});

Deno.test({
	name: "contains() false",
	fn() {
		const list = new FakeDomTokenList();
		list.add("a", "b", "c");
		assertEquals(list.contains("d"), false);
	},
});
