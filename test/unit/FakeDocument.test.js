import { assertEquals, assertInstanceOf } from "asserts";
import { FakeDocument } from "../../src/FakeDocument.js";
import { FakeHtmlElement } from "../../src/FakeHtmlElement.js";

Deno.test({
	name: "createElement()",
	fn() {
		const document = new FakeDocument();

		const el = document.createElement("div");
		assertInstanceOf(el, FakeHtmlElement);
		assertEquals(el.tagName, "DIV");

		assertInstanceOf;
	},
});
