import { HtmlElement } from "./FakeHtmlElement.js";

export class FakeDocument extends EventTarget {
	constructor() {
		super();
		this.head = new HtmlElement({ tagName: "head" });
		this.body = new HtmlElement({ tagName: "body" });
	}

	/**
	 * @param {string} tagName
	 */
	createElement(tagName) {
		return new HtmlElement({
			tagName,
		});
	}

	/**
	 * @param {string} _namespace
	 * @param {string} tagName
	 */
	createElementNS(_namespace, tagName) {
		return new HtmlElement({
			isDomNode: false,
			tagName,
		});
	}
}

const originalDocument = globalThis.document;

let sanitizeDoubleInstalls = false;
/**
 * When calling `installFakeDocument()` multiple times without calling
 * `uninstallFakeDocument()` first, by default no error is thrown. However, this
 * makes it possible for global state to leak from one test to another.
 *
 * You can use this function to enable a sanitizer that throws an error when
 * `installFakeDocument()` is called multiple times.
 *
 * The upside is that tests are less likely to leak global state, but the
 * downside is that if a test fails, any other tests calling
 * `installFakeDocument()` will fail as well.
 *
 * @param {boolean} value
 */
export function setSanitizeDoubleInstalls(value) {
	sanitizeDoubleInstalls = value;
}

/** @type {FakeDocument?} */
let currentFake = null;

export function installFakeDocument() {
	if (currentFake && sanitizeDoubleInstalls) {
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
