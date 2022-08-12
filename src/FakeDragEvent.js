import { FakeDataTransfer } from "./FakeDataTransfer.js";
import { FakeMouseEvent } from "./FakeMouseEvent.js";

export class FakeDragEvent extends FakeMouseEvent {
	/**
	 * @param {ConstructorParameters<typeof MouseEvent>[0]} type
	 * @param {ConstructorParameters<typeof MouseEvent>[1]} [eventInit]
	 */
	constructor(type, eventInit) {
		super(type, {
			cancelable: true,
			...eventInit,
		});

		this.dataTransfer = new FakeDataTransfer();
	}
}

const cast = /** @type {typeof FakeDragEvent & typeof DragEvent} */ (FakeDragEvent);
export { cast as DragEvent };
