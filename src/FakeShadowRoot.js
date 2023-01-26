import { FakeHtmlElement } from "./FakeHtmlElement.js";

export class FakeShadowRoot extends FakeHtmlElement {
}

const CastShadowRoot = /** @type {typeof FakeShadowRoot & typeof ShadowRoot & (new (...args: any) => ShadowRoot)} */ (FakeShadowRoot);
export { CastShadowRoot as ShadowRoot };

export function installShadowDom() {
	const castConstructor = /** @type {{prototype: HTMLElement}} */ (/** @type {unknown} */ (FakeHtmlElement));
	castConstructor.prototype.attachShadow = function () {
		if (this.shadowRoot) {
			throw new DOMException("Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree.", "NotSupportedError");
		}

		const shadowRoot = new CastShadowRoot();
		// @ts-ignore shadowRoot is normally not assignable, but it is on our FakeHtmlElement
		this.shadowRoot = shadowRoot;
		return shadowRoot;
	};
}
