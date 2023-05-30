import { FakeDataTransferItem } from "./FakeDataTransferItem.js";

export class FakeDataTransferItemList {
	#itemsMap;
	/**
	 * @param {Map<string, string>} itemsMap
	 */
	constructor(itemsMap) {
		this.#itemsMap = itemsMap;
	}

	get length() {
		return this.#itemsMap.size;
	}

	*[Symbol.iterator]() {
		for (const [type, value] of this.#itemsMap) {
			yield new FakeDataTransferItem("string", type, value);
		}
	}
}

const cast = /** @type {typeof FakeDataTransferItemList & typeof DataTransferItemList} */ (FakeDataTransferItemList);
export { cast as DataTransferItemList };
