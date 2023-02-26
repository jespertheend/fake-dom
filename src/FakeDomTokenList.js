export class FakeDomTokenList {
	/** @type {Set<string>} */
	#list = new Set();

	get length() {
		return this.#list.size;
	}

	get value() {
		return Array.from(this.#list).join(" ");
	}

	/**
	 * @param  {...string} tokens
	 */
	add(...tokens) {
		for (const token of tokens) {
			this.#list.add(token);
		}
	}

	/**
	 * @param  {...string} tokens
	 */
	remove(...tokens) {
		for (const token of tokens) {
			this.#list.delete(token);
		}
	}

	/**
	 * @param {string} token
	 * @param {boolean} [force]
	 */
	toggle(token, force) {
		let shouldHaveToken;
		if (force === undefined) {
			shouldHaveToken = !this.#list.has(token);
		} else {
			shouldHaveToken = force;
		}
		if (shouldHaveToken) {
			this.#list.add(token);
		} else {
			this.#list.delete(token);
		}
	}

	/**
	 * @param {string} token
	 */
	contains(token) {
		return this.#list.has(token);
	}
}

const cast = /** @type {typeof FakeDomTokenList & typeof DOMTokenList & (new (...args: any) => FakeDomTokenList & DOMTokenList)} */ (FakeDomTokenList);
export { cast as DomTokenList };
