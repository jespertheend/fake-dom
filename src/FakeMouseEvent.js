export class FakeMouseEvent extends Event {
	/**
	 * @param {ConstructorParameters<typeof MouseEvent>[0]} type
	 * @param {ConstructorParameters<typeof MouseEvent>[1]} [eventInit]
	 */
	constructor(type, eventInit) {
		super(type, eventInit);

		this.clientX = eventInit?.clientX ?? 0;
		this.clientY = eventInit?.clientY ?? 0;
		this.buttons = eventInit?.buttons ?? 0;

		this.button = eventInit?.button ?? 0;
		this.buttons = eventInit?.buttons ?? 0;
		this.altKey = eventInit?.altKey ?? false;
		this.ctrlKey = eventInit?.ctrlKey ?? false;
		this.metaKey = eventInit?.altKey ?? false;
		this.shiftKey = eventInit?.shiftKey ?? false;
	}
}

const cast = /** @type {typeof FakeMouseEvent & typeof MouseEvent & (new (...args: any) => FakeMouseEvent & MouseEvent)} */ (FakeMouseEvent);
export { cast as MouseEvent };
