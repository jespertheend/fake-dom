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
