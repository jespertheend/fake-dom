import { FakeDataTransfer } from "./FakeDataTransfer.js";

export class FakeClipboardEvent extends Event {
	/**
	 * @param {ConstructorParameters<typeof ClipboardEvent>[0]} type
	 * @param {ConstructorParameters<typeof ClipboardEvent>[1]} [eventInit]
	 */
	constructor(type, eventInit) {
		super(type, {
			cancelable: true,
			...eventInit,
		});

		this.clipboardData = new FakeDataTransfer();
	}
}

const cast = /** @type {typeof FakeClipboardEvent & typeof ClipboardEvent & (new (...args: any) => FakeClipboardEvent & Event)} */ (FakeClipboardEvent);
export { cast as ClipboardEvent };
