import { assertEquals, assertInstanceOf, assertThrows } from "asserts";
import { FakeDocument, installFakeDocument, setSanitizeDoubleInstalls, uninstallFakeDocument } from "../../src/FakeDocument.js";
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

Deno.test({
	name: "createElementNS()",
	fn() {
		const document = new FakeDocument();

		const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
		assertInstanceOf(el, FakeHtmlElement);
		assertEquals(el.tagName, "path");

		assertInstanceOf;
	},
});

Deno.test({
	name: "document has a body",
	fn() {
		const document = new FakeDocument();
		assertEquals(document.body.tagName, "BODY");
	},
});

Deno.test({
	name: "installFakeDocument() multiple times doesn't throw",
	fn() {
		installFakeDocument();
		installFakeDocument();
		uninstallFakeDocument();
	},
});

Deno.test({
	name: "installFakeDocument() multiple times throws when sanitizers are enabled",
	fn() {
		setSanitizeDoubleInstalls(true);
		installFakeDocument();
		assertThrows(() => installFakeDocument());
		uninstallFakeDocument();
		setSanitizeDoubleInstalls(false);
	},
});

Deno.test({
	name: "installFakeDocument() multiple times doesn't throw when uninstall is called in between",
	fn() {
		setSanitizeDoubleInstalls(true);
		installFakeDocument();
		uninstallFakeDocument();
		installFakeDocument();
		uninstallFakeDocument();
		setSanitizeDoubleInstalls(false);
	},
});
