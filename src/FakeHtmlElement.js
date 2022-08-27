import { DomTokenList } from "./FakeDomTokenList.js";

export class FakeHtmlElement extends EventTarget {
	#tagName;
	#x;
	#y;
	#paddingLeft;
	#paddingTop;
	/** @type {Map<string, string>} */
	#attributes = new Map();
	/** @type {(FakeHtmlElement | HTMLElement)[]} */
	#children = [];
	/** @type {FakeHtmlElement | HTMLElement | null} */
	#parentElement = null;

	constructor({
		tagName = "",
		x = 0,
		y = 0,
		clientWidth = 100,
		clientHeight = 100,
		paddingLeft = 0,
		paddingRight = 0,
		paddingTop = 0,
		paddingBottom = 0,
	} = {}) {
		super();

		/** @type {Object.<string, string>} */
		this.style = {
			paddingLeft: paddingLeft + "px",
			paddingRight: paddingRight + "px",
			paddingTop: paddingTop + "px",
			paddingBottom: paddingBottom + "px",
		};

		this.#tagName = tagName.toUpperCase();

		this.#x = x;
		this.#y = y;
		this.#paddingLeft = paddingLeft;
		this.#paddingTop = paddingTop;
		this.clientWidth = clientWidth;
		this.clientHeight = clientHeight;
		this.classList = new DomTokenList();

		/** @type {Object.<string, unknown>} */
		this.dataset = new Proxy({}, {
			get: (_target, prop, _receiver) => {
				let attr;
				try {
					attr = this.camelCaseToDashStyle(prop);
				} catch {
					return undefined;
				}
				return this.#attributes.get(attr);
			},
			set: (_target, prop, value, _receiver) => {
				const attr = this.camelCaseToDashStyle(prop);
				this.setAttribute(attr, value);
				return true;
			},
		});
	}

	/**
	 * Converts camel case to dash-style for the dataset property
	 * @private
	 * @param {string | symbol} str
	 */
	camelCaseToDashStyle(str) {
		if (typeof str === "symbol") {
			throw new Error("Symbols are not yet supported");
		}
		if (/-[a-z]/.test(str)) {
			throw new Error(`Failed to set a named property. ${str} is not a valid property name.`);
		}
		const dashed = str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
		return "data-" + dashed;
	}

	get tagName() {
		return this.#tagName;
	}

	getBoundingClientRect() {
		const x = this.#x + this.#paddingLeft;
		const y = this.#y + this.#paddingTop;
		return {
			x,
			y,
			left: x,
			top: y,
			right: x + this.clientWidth,
			bottom: y + this.clientHeight,
			width: this.clientWidth,
			height: this.clientHeight,
		};
	}

	/**
	 * @param {string} name
	 * @param {string} value
	 */
	setAttribute(name, value) {
		name = name.toLowerCase();
		this.#attributes.set(name, String(value));
	}

	/**
	 * @param {string} name
	 */
	getAttribute(name) {
		return this.#attributes.get(name.toLowerCase()) || null;
	}

	/**
	 * @param {string} name
	 */
	removeAttribute(name) {
		return this.#attributes.delete(name.toLowerCase());
	}

	get children() {
		return [...this.#children];
	}

	get parentElement() {
		return this.#parentElement;
	}

	/**
	 * @param {FakeHtmlElement | HTMLElement | null} parentElement
	 */
	_setParentElement(parentElement) {
		this.#parentElement = parentElement;
	}

	/**
	 * @param {FakeHtmlElement | HTMLElement} child
	 */
	appendChild(child) {
		if (child instanceof FakeHtmlElement) {
			child._setParentElement(this);
		}
		this.#children.push(child);
	}

	/**
	 * @param {FakeHtmlElement | HTMLElement} child
	 */
	removeChild(child) {
		const index = this.#children.indexOf(child);
		if (index === -1) {
			throw new Error("The node to be removed is not a child of this node.");
		}
		if (child instanceof FakeHtmlElement) {
			child._setParentElement(null);
		}
		this.#children.splice(index, 1);
	}

	/**
	 * @param {FakeHtmlElement | HTMLElement} newNode
	 * @param {FakeHtmlElement | HTMLElement} referenceNode
	 */
	insertBefore(newNode, referenceNode) {
		const index = this.#children.indexOf(referenceNode);
		if (index === -1) {
			throw new Error("Invalid reference node");
		}
		if (newNode instanceof FakeHtmlElement) {
			newNode._setParentElement(this);
		}
		this.#children.splice(index, 0, newNode);
	}
}

const cast = /** @type {typeof FakeHtmlElement & typeof HTMLElement & (new (...args: any) => FakeHtmlElement & HTMLElement)} */ (FakeHtmlElement);
export { cast as HtmlElement };
