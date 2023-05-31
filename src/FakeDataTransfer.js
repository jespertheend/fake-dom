import { FakeDataTransferItemList } from "./FakeDataTransferItemList.js";

export class FakeDataTransfer {
	dropEffect = "none";
	effectAllowed = "none";
	/** @type {File[]} */
	files = [];

	/** @type {Map<string, string>} */
	#items = new Map();

	items = new FakeDataTransferItemList(this.#items);

	get types() {
		return [...this.#items.keys()];
	}

	clearData() {
		this.#items.clear();
	}

	/**
	 * @param {string} type
	 * @param {string} value
	 */
	setData(type, value) {
		this.#items.set(type, String(value));
	}

	/**
	 * @param {string} type
	 */
	getData(type) {
		return this.#items.get(type) || "";
	}

	/**
	 * @param {Element} _image
	 * @param {number} _x
	 * @param {number} _y
	 */
	setDragImage(_image, _x, _y) {}
}

const cast = /** @type {typeof FakeDataTransfer & typeof DataTransfer} */ (FakeDataTransfer);
export { cast as DataTransfer };
