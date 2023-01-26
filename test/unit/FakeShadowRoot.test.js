import { installShadowDom } from "../../src/FakeShadowRoot.js";
import { HtmlElement } from "../../src/FakeHtmlElement.js";
import { assertStrictEquals } from "asserts";

Deno.test({
	name: "Installing and using it",
	fn() {
		installShadowDom();

		const el = new HtmlElement();
		const shadow = el.attachShadow({ mode: "open" });
		const el2 = new HtmlElement();
		shadow.appendChild(el2);

		assertStrictEquals(el.shadowRoot, shadow);
	},
});

Deno.test({
	name: "shadowRoot exists even in closed mode",
	fn() {
		installShadowDom();

		const el = new HtmlElement();
		const shadow = el.attachShadow({ mode: "closed" });

		assertStrictEquals(el.shadowRoot, shadow);
	},
});
