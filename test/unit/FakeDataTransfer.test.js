import { assertEquals } from "asserts";
import { FakeDataTransfer } from "../../src/FakeDataTransfer.js";

Deno.test({
	name: "Getting and setting data",
	fn() {
		const dataTransfer = new FakeDataTransfer();
		dataTransfer.setData("text/plain", "Hello, world!");
		assertEquals(dataTransfer.getData("text/plain"), "Hello, world!");
		assertEquals(dataTransfer.types, ["text/plain"]);
	},
});

Deno.test({
	name: "Clearing data",
	fn() {
		const dataTransfer = new FakeDataTransfer();
		dataTransfer.setData("text/plain", "Hello, world!");
		dataTransfer.clearData();
		assertEquals(dataTransfer.types, []);
		assertEquals(dataTransfer.getData("text/plain"), "");
	},
});

Deno.test({
	name: "Special cases",
	fn() {
		const dataTransfer = new FakeDataTransfer();
		dataTransfer.setData("a", /** @type {any} */ (null));
		dataTransfer.setData("b", /** @type {any} */ (undefined));
		assertEquals(dataTransfer.types, ["a", "b"]);
		assertEquals(dataTransfer.getData("a"), "null");
		assertEquals(dataTransfer.getData("b"), "undefined");
	},
});

Deno.test({
	name: "DataTransfer.items",
	fn() {
		const dataTransfer = new FakeDataTransfer();
		dataTransfer.setData("a", "hello");
		dataTransfer.setData("b", "world");

		assertEquals(dataTransfer.items.length, 2);
		const array = Array.from(dataTransfer.items);
		assertEquals(array.length, 2);

		/** @type {string[]} */
		const getAsStringCalls = [];

		const item1 = array[0];
		assertEquals(item1.kind, "string");
		assertEquals(item1.type, "a");
		item1.getAsString((str) => getAsStringCalls.push(str));
		assertEquals(getAsStringCalls, ["hello"]);

		const item2 = array[1];
		assertEquals(item2.kind, "string");
		assertEquals(item2.type, "b");
		item2.getAsString((str) => getAsStringCalls.push(str));
		assertEquals(getAsStringCalls, ["hello", "world"]);
	},
});
