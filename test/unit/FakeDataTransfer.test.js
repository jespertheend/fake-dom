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
