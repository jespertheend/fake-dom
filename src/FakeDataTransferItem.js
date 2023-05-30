export class FakeDataTransferItem {
	#value;
	/**
	 * @param {"string" | "file"} kind
	 * @param {string} type
	 * @param {string} value
	 */
	constructor(kind, type, value) {
		this.kind = kind;
		this.type = type;
		this.#value = value;
	}

	/**
	 * @param {(string: string) => void} callback
	 */
	getAsString(callback) {
		callback(this.#value);
	}
}

const cast = /** @type {typeof FakeDataTransferItem & typeof DataTransferItem} */ (FakeDataTransferItem);
export { cast as DataTransferItem };
