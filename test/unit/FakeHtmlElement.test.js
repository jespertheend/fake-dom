import { assertEquals, assertStrictEquals } from "asserts";
import { FakeHtmlElement } from "../../src/FakeHtmlElement.js";

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

Deno.test({
	name: "appendChild()",
	fn() {
		const el = new FakeHtmlElement();
		const child = new FakeHtmlElement();
		el.appendChild(child);
	},
});

Deno.test({
	name: "children returns an array of its children",
	fn() {
		const el = new FakeHtmlElement();
		const child1 = new FakeHtmlElement();
		const child2 = new FakeHtmlElement();
		el.appendChild(child1);
		el.appendChild(child2);

		const children = el.children;
		assertEquals(children.length, 2);
		assertStrictEquals(children[0], child1);
		assertStrictEquals(children[1], child2);
	},
});

Deno.test({
	name: "modifying children does not modify the original array",
	fn() {
		const el = new FakeHtmlElement();
		const child = new FakeHtmlElement();
		el.appendChild(child);

		const children = el.children;
		children[1] = new FakeHtmlElement();
		assertEquals(el.children.length, 1);
	},
});
