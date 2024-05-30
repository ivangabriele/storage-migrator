/**
 * Any object with string keys.
 *
 * @internal
 */
export type AnyObject = {
	// biome-ignore lint/suspicious/noExplicitAny: This is a generic object type.
	[k: string]: any
}
