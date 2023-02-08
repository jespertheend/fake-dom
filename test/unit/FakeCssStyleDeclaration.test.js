import { assertEquals } from "asserts";
import { CSSStyleDeclaration } from "../../src/FakeCssStyleDeclaration.js";

Deno.test({
	name: "getting and setting properties",
	fn() {
		const decl = new CSSStyleDeclaration();
		assertEquals(decl.paddingLeft, "");
		decl.paddingLeft = "3px";
		assertEquals(decl.paddingLeft, "3px");
		assertEquals(decl.getPropertyValue("paddingLeft"), "3px");

		decl.setProperty("paddingRight", "5px");
		assertEquals(decl.paddingRight, "5px");
		assertEquals(decl.getPropertyValue("paddingRight"), "5px");
	},
});
