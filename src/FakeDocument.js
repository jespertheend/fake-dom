import { HtmlElement } from "./FakeHtmlElement.js";

export class FakeDocument {
	constructor() {
		this.body = new HtmlElement({
			tagName: "body",
		});
	}
	/**
	 * @param {string} tagName
	 */
	createElement(tagName) {
		return new HtmlElement({
			tagName,
		});
	}
}

const originalDocument = globalThis.document;

/** @type {FakeDocument?} */
let currentFake = null;

export function installFakeDocument() {
	if (currentFake) {
		throw new Error("An existing fake document is already installed.");
	}
	const fake = new FakeDocument();
	currentFake = fake;
	const castFake = /** @type {unknown} */ (fake);
	globalThis.document = /** @type {Document} */ (castFake);
	return fake;
}

export function uninstallFakeDocument() {
	if (!currentFake) {
		throw new Error("No fake document is currently installed.");
	}
	currentFake = null;
	globalThis.document = originalDocument;
}
