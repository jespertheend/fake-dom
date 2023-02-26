import { FakeMouseEvent } from "./FakeMouseEvent.js";

export class FakeWheelEvent extends FakeMouseEvent {
	/**
	 * @param {string} type
	 * @param {ConstructorParameters<typeof WheelEvent>[1]} eventInit
	 */
	constructor(type, eventInit) {
		super(type, eventInit);

		this.deltaX = eventInit?.deltaX ?? 0;
		this.deltaY = eventInit?.deltaY ?? 0;
		this.deltaZ = eventInit?.deltaZ ?? 0;
		this.deltaMode = eventInit?.deltaMode ?? 0;
	}

	static DOM_DELTA_PIXEL = 0x00;
	static DOM_DELTA_LINE = 0x01;
	static DOM_DELTA_PAGE = 0x02;
}

const cast = /** @type {typeof FakeWheelEvent & typeof WheelEvent & (new (...args: any) => FakeWheelEvent & WheelEvent)} */ (FakeWheelEvent);
export { cast as WheelEvent };
