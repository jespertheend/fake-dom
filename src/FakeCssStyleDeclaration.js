export class FakeCssStyleDeclaration {
	constructor() {
		return new Proxy(this, {
			get(target, prop) {
				const castTarget = /** @type {any} */ (target);
				const original = castTarget[prop];
				return original || "";
			},
			set(target, prop, newValue) {
				const castTarget = /** @type {any} */ (target);
				castTarget[prop] = String(newValue);
				return true;
			},
		});
	}

	/**
	 * @param {string} property
	 * @param {string} value
	 */
	setProperty(property, value) {
		const castTarget = /** @type {any} */ (this);
		castTarget[property] = String(value);
	}

	/**
	 * @param {string} property
	 */
	getPropertyValue(property) {
		const castTarget = /** @type {any} */ (this);
		return castTarget[property];
	}
}

const cast = /** @type {typeof FakeCssStyleDeclaration & typeof CSSStyleDeclaration & (new (...args: any) => FakeCssStyleDeclaration & CSSStyleDeclaration)} */ (FakeCssStyleDeclaration);
export { cast as CSSStyleDeclaration };
