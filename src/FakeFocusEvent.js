export class FakeFocusEvent extends Event {
	/**
	 * @param {ConstructorParameters<typeof FocusEvent>[0]} type
	 * @param {ConstructorParameters<typeof FocusEvent>[1]} [eventInit]
	 */
	constructor(type, eventInit) {
		super(type, eventInit);
	}
}

const cast = /** @type {typeof FakeFocusEvent & typeof FocusEvent & (new (...args: any) => FakeFocusEvent & FocusEvent)} */ (FakeFocusEvent);
export { cast as FocusEvent };
