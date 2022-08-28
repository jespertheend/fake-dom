import { FakeHtmlElement } from "../../src/FakeHtmlElement.js";
import { FakeFocusEvent } from "../../src/FakeFocusEvent.js";
import { assertStrictEquals } from "asserts";

Deno.test({
	name: "relatedTarget",
	fn() {
		const el = new FakeHtmlElement();

		const event1 = new FakeFocusEvent("focusin", {
			relatedTarget: el,
		});
		assertStrictEquals(event1.relatedTarget, el);

		const event2 = new FakeFocusEvent("focusin");
		assertStrictEquals(event2.relatedTarget, null);
	},
});
