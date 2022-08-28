import { assertEquals, assertStrictEquals, assertThrows } from "asserts";
import { FakeHtmlElement } from "../../../src/FakeHtmlElement.js";

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

Deno.test({
	name: "insertBefore()",
	fn() {
		const el = new FakeHtmlElement();
		const child1 = new FakeHtmlElement();
		const child2 = new FakeHtmlElement();
		el.appendChild(child1);
		el.appendChild(child2);

		const newChild = new FakeHtmlElement();
		el.insertBefore(newChild, child2);

		assertEquals(el.children.length, 3);
		assertStrictEquals(el.children[0], child1);
		assertStrictEquals(el.children[1], newChild);
		assertStrictEquals(el.children[2], child2);
	},
});

Deno.test({
	name: "insertBefore() throws with an invalid second argument",
	fn() {
		const el = new FakeHtmlElement();
		const newChild = new FakeHtmlElement();
		const unaddedChild = new FakeHtmlElement();

		assertThrows(() => el.insertBefore(newChild, unaddedChild));
	},
});

Deno.test({
	name: "removeChild()",
	fn() {
		const el = new FakeHtmlElement();
		const child1 = new FakeHtmlElement();
		const child2 = new FakeHtmlElement();
		const child3 = new FakeHtmlElement();
		el.appendChild(child1);
		el.appendChild(child2);
		el.appendChild(child3);

		el.removeChild(child2);

		assertEquals(el.children.length, 2);
		assertStrictEquals(el.children[0], child1);
		assertStrictEquals(el.children[1], child3);
	},
});

Deno.test({
	name: "removeChild() throws if the child to be removed is not a child of the node.",
	fn() {
		const el = new FakeHtmlElement();
		const el2 = new FakeHtmlElement();

		assertThrows(() => el.removeChild(el2));
	},
});

Deno.test({
	name: "appending a child sets the parentElement",
	fn() {
		const parent = new FakeHtmlElement();
		const child = new FakeHtmlElement();

		parent.appendChild(child);

		assertStrictEquals(child.parentElement, parent);
	},
});

Deno.test({
	name: "insertBefore() sets the parent element",
	fn() {
		const parent = new FakeHtmlElement();
		const child1 = new FakeHtmlElement();
		const child2 = new FakeHtmlElement();
		parent.appendChild(child2);

		parent.insertBefore(child1, child2);

		assertStrictEquals(child1.parentElement, parent);
	},
});

Deno.test({
	name: "removeChild() sets the parent element to null",
	fn() {
		const parent = new FakeHtmlElement();
		const child = new FakeHtmlElement();
		parent.appendChild(child);
		parent.removeChild(child);

		assertEquals(child.parentElement, null);
	},
});

Deno.test({
	name: "contains()",
	fn() {
		const parent = new FakeHtmlElement();
		const child = new FakeHtmlElement();
		parent.appendChild(child);

		const subChild = new FakeHtmlElement();
		child.appendChild(subChild);

		const nonChild = new FakeHtmlElement();

		assertEquals(parent.contains(parent), true);
		assertEquals(parent.contains(child), true);
		assertEquals(parent.contains(subChild), true);
		assertEquals(parent.contains(nonChild), false);
	},
});
