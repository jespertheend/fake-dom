import { assertEquals, assertStrictEquals } from "asserts";
import { FakeHtmlElement } from "../../../src/FakeHtmlElement.js";

Deno.test({
	name: "no tagName",
	fn() {
		const el = new FakeHtmlElement();
		assertStrictEquals(el.tagName, "");
	},
});

Deno.test({
	name: "tagName",
	fn() {
		const el = new FakeHtmlElement({ tagName: "div" });
		assertStrictEquals(el.tagName, "DIV");
	},
});

Deno.test({
	name: "tagName for namespace element",
	fn() {
		const el = new FakeHtmlElement({ tagName: "path", isDomNode: false });
		assertStrictEquals(el.tagName, "path");
	},
});

Deno.test({
	name: "id",
	fn() {
		const el = new FakeHtmlElement();
		assertEquals(el.id, "");

		el.id = "element id";
		assertEquals(el.id, "element id");
		assertEquals(el.getAttribute("id"), "element id");

		el.setAttribute("id", "other id");
		assertEquals(el.id, "other id");
		assertEquals(el.getAttribute("id"), "other id");
	},
});

Deno.test({
	name: "getBoundingClientRect() default params",
	fn() {
		const el = new FakeHtmlElement();
		assertEquals(el.getBoundingClientRect(), {
			x: 0,
			y: 0,
			left: 0,
			top: 0,
			right: 100,
			bottom: 100,
			width: 100,
			height: 100,
		});
	},
});

Deno.test({
	name: "getBoundingClientRect() with params",
	fn() {
		const el = new FakeHtmlElement({
			x: 50,
			y: 100,
			clientWidth: 200,
			clientHeight: 300,
		});
		assertEquals(el.getBoundingClientRect(), {
			x: 50,
			y: 100,
			left: 50,
			top: 100,
			right: 250,
			bottom: 400,
			width: 200,
			height: 300,
		});
	},
});

Deno.test({
	name: "getBoundingClientRect() with padding",
	fn() {
		const el = new FakeHtmlElement({
			x: 50,
			y: 100,
			clientWidth: 200,
			clientHeight: 300,
			paddingLeft: 10,
			paddingRight: 20,
			paddingTop: 30,
			paddingBottom: 40,
		});
		assertEquals(el.getBoundingClientRect(), {
			x: 60,
			y: 130,
			left: 60,
			top: 130,
			right: 260,
			bottom: 430,
			width: 200,
			height: 300,
		});
	},
});
