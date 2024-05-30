export function assertNotNullish<T>(
	value: T | null | undefined,
): asserts value is T {
	if (value === null) {
		throw new Error("The value is null.")
	}

	if (value === undefined) {
		throw new Error("The value is undefined.")
	}
}
