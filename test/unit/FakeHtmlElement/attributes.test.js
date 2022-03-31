import { assertEquals, assertThrows } from "asserts";
import { FakeHtmlElement } from "../../../src/FakeHtmlElement.js";

Deno.test({
	name: "setting an attribute",
	fn() {
		const el = new FakeHtmlElement();
		el.setAttribute("data-test-attribute", "foo");
		assertEquals(el.getAttribute("data-test-attribute"), "foo");
	},
});

Deno.test({
	name: "setting an attribute with upper case",
	fn() {
		const el = new FakeHtmlElement();
		el.setAttribute("Data-Test-Attribute", "foo");
		assertEquals(el.getAttribute("data-test-attribute"), "foo");
	},
});

Deno.test({
	name: "setting an attribute converts values to string",
	fn() {
		/** @type {[any, string][]} */
		const tests = [
			[1, "1"],
			[true, "true"],
			[null, "null"],
			["str", "str"],
		];

		for (const [value, expected] of tests) {
			const el = new FakeHtmlElement();
			el.setAttribute("some-attribute", value);
			assertEquals(el.getAttribute("some-attribute"), expected);
		}
	},
});

Deno.test({
	name: "getting an attribute with upper case",
	fn() {
		const el = new FakeHtmlElement();
		el.setAttribute("data-test-attribute", "foo");
		assertEquals(el.getAttribute("Data-Test-Attribute"), "foo");
	},
});

Deno.test({
	name: "overwriting an attribute with a different value",
	fn() {
		const el = new FakeHtmlElement();
		el.setAttribute("attr", "foo");
		el.setAttribute("attr", "bar");
		assertEquals(el.getAttribute("attr"), "bar");
	},
});

Deno.test({
	name: "overwriting an attribute with a different case",
	fn() {
		const el = new FakeHtmlElement();
		el.setAttribute("attr", "foo");
		el.setAttribute("Attr", "bar");
		assertEquals(el.getAttribute("attr"), "bar");
	},
});

Deno.test({
	name: "removeAttribute()",
	fn() {
		const el = new FakeHtmlElement();
		el.setAttribute("attr", "foo");
		el.removeAttribute("attr");
		assertEquals(el.getAttribute("attr"), null);
	},
});

Deno.test({
	name: "setting attributes via dataset",
	fn() {
		const el = new FakeHtmlElement();
		el.dataset.testAttribute = "foo";
		assertEquals(el.getAttribute("data-test-attribute"), "foo");
	},
});

Deno.test({
	name: "getting attributes via dataset",
	fn() {
		const el = new FakeHtmlElement();
		el.setAttribute("data-test-attribute", "foo");
		assertEquals(el.dataset.testAttribute, "foo");
	},
});

Deno.test({
	name: "non existent dataset attribute",
	fn() {
		const el = new FakeHtmlElement();
		assertEquals(el.dataset.testAttribute, undefined);
	},
});

Deno.test({
	name: "dataset set value with all upper case",
	fn() {
		const el = new FakeHtmlElement();
		el.dataset.AAA = "foo";
		assertEquals(el.getAttribute("data--a-a-a"), "foo");
	},
});

Deno.test({
	name: "dataset set value with multiple uppercase",
	fn() {
		const el = new FakeHtmlElement();
		el.dataset.aAA = "foo";
		assertEquals(el.getAttribute("data-a-a-a"), "foo");
	},
});

Deno.test({
	name: "dataset converts values to string",
	fn() {
		const tests = [
			[1, "1"],
			[true, "true"],
			[null, "null"],
			["str", "str"],
		];

		for (const [value, expected] of tests) {
			const el = new FakeHtmlElement();
			el.dataset.attr = value;
			assertEquals(el.getAttribute("data-attr"), expected);
		}
	},
});

Deno.test({
	name: "dataset setting with invalid property",
	fn() {
		const el = new FakeHtmlElement();
		assertThrows(() => {
			el.dataset["invalid-lowercase-after-dash"] = "foo";
		});
	},
});

Deno.test({
	name: "dataset getting with invalid property",
	fn() {
		const el = new FakeHtmlElement();
		assertEquals(el.dataset["invalid-lowercase-after-dash"], undefined);
	},
});
