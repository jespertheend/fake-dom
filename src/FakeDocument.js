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

// I tried combining runWithDom and runWithDom into one function, but that doesn't work because
// it will cause tests with non async functions to throw outside of the test.
// That way Deno's test runner is not able to know which test the error originated from.
// For example:
//
// Deno.test("name", () => {
// 	runWithDomAsync(() => {
// 		// do something
// 	})
// })
//
// Even though the function passed to runWithDomAsync is synchronous, runWithDomAsync itself is not.
// So the function passed to Deno.test() will finish before runWithDomAsync is completed.

/**
 * Runs the function with an installed fake dom.
 * Ensures global scope is cleaned up after running, even if errors are thrown.
 * @param {() => void | undefined} fn
 */
export function runWithDom(fn) {
	installFakeDocument();

	try {
		fn();
	} finally {
		uninstallFakeDocument();
	}
}

/**
 * Same as {@linkcode runWithDom} but async.
 * Make sure to await this call, otherwise test runners won't know which test an error originated from.
 *
 * For example:
 *
 * ```js
 * Deno.test("name", async () => {
 * 	await runWithDomAsync(async () => {
 * 		// do something
 * 	})
 * })
 * ```
 * @param {() => (Promise<void>)} fn
 */
export async function runWithDomAsync(fn) {
	installFakeDocument();

	try {
		await fn();
	} finally {
		uninstallFakeDocument();
	}
}
