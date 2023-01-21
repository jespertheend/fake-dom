export class FakeKeyboardEvent extends Event {
	/**
	 * @param {ConstructorParameters<typeof KeyboardEvent>[0]} type
	 * @param {ConstructorParameters<typeof KeyboardEvent>[1]} [eventInit]
	 */
	constructor(type, eventInit) {
		super(type, eventInit);

		this.code = eventInit?.code;
		this.key = eventInit?.key;
		this.altKey = eventInit?.altKey;
		this.ctrlKey = eventInit?.ctrlKey;
		this.metaKey = eventInit?.metaKey;
		this.shiftKey = eventInit?.shiftKey;
	}
}

const cast = /** @type {typeof FakeKeyboardEvent & typeof KeyboardEvent & (new (...args: any) => FakeKeyboardEvent & KeyboardEvent)} */ (FakeKeyboardEvent);
export { cast as KeyboardEvent };
