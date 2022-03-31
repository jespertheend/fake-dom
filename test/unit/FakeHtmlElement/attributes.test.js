import { assertEquals } from "asserts";
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
