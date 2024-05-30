import { afterAll, beforeAll, describe, expect, it, jest } from "@jest/globals"

import { assertNotNullish } from "../assertNotNullish"

describe("utils/assertNotNullish()", () => {
	// biome-ignore lint/suspicious/noExplicitAny: No need to specify the type of originalConsole.
	const originalConsole = {} as Record<keyof Console, any>
	const methods = ["error", "group", "info", "log", "warning"]

	beforeAll(() => {
		for (const method of methods) {
			originalConsole[method] = console[method]
			console[method] = jest.fn()
		}
	})

	afterAll(() => {
		for (const method of methods) {
			console[method] = originalConsole[method]
		}
	})

	it("should not throw an error if the value is defined", () => {
		const value = "test"

		const call = () => assertNotNullish(value)

		expect(call).not.toThrow()
	})

	it("should throw a FrontendError if the value is null", () => {
		const value = null

		const call = () => assertNotNullish(value)

		expect(call).toThrow(Error)
		expect(call).toThrow("The value is null.")
	})

	it("should throw a FrontendError if the value is undefined", () => {
		const value = undefined

		const call = () => assertNotNullish(value)

		expect(call).toThrow(Error)
		expect(call).toThrow("The value is undefined.")
	})
})
