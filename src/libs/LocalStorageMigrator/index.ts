import { assertNotNullish } from "@utils/assertNotNullish"
import { isPlainObject, omit } from "lodash/fp"

import {
	LAST_MIGRATION_VERSION_KEY,
	LocalStorageMigrationOperationType,
} from "./constants"

import type { AnyObject } from "@typings"
import type {
	LocalStorageMigration,
	RenameJsonValuePropertyKey,
	UpdateJsonValuePropertyValue,
} from "./types"

/**
 * Local storage migrations manager.
 */
export class LocalStorageMigrator {
	#clientLastMigrationVersion: number
	#migrations: LocalStorageMigration[]

	constructor(migrations: LocalStorageMigration[]) {
		this.#clientLastMigrationVersion = Number.parseInt(
			localStorage.getItem(LAST_MIGRATION_VERSION_KEY) ?? "0",
			10,
		)
		this.#migrations = migrations
	}

	/**
	 * Run all necessary migrations.
	 */
	run(): void {
		const startMigrationVersion = this.#clientLastMigrationVersion + 1
		const lastMigrationVersion = this.#migrations.length
		for (
			let migrationVersion = startMigrationVersion;
			migrationVersion <= lastMigrationVersion;
			migrationVersion += 1
		) {
			const migration = this.#migrations[migrationVersion - 1]
			assertNotNullish(migration)

			this.#applyMigration(migration)

			this.#clientLastMigrationVersion = migrationVersion
			localStorage.setItem(
				LAST_MIGRATION_VERSION_KEY,
				migrationVersion.toString(),
			)
		}
	}

	/**
	 * Apply a single migration.
	 */
	#applyMigration(migration: LocalStorageMigration): void {
		for (const operation of migration.operations) {
			switch (operation.type) {
				case LocalStorageMigrationOperationType.RenameKey: {
					this.#renameLocalStorageKey(operation.from, operation.to)
					break
				}

				case LocalStorageMigrationOperationType.DeleteKey: {
					this.#deleteLocalStorageKey(operation.key)
					break
				}

				case LocalStorageMigrationOperationType.UpdateJsonPropertyValue: {
					this.#updateLocalStorageJsonValuePropertyValue(operation)
					break
				}

				case LocalStorageMigrationOperationType.RenameJsonValuePropertyKey: {
					this.#updateLocalStorageJsonValuePropertyKey(operation)
					break
				}

				default:
					throw new Error(
						`[LocalStorageMigrator] Unknown operation type: "${
							// biome-ignore lint/suspicious/noExplicitAny: No need to specify the type of operation.
							(operation as any).type
						}".`,
					)
			}
		}
	}

	/**
	 * Delete a local storage key.
	 */
	#deleteLocalStorageKey(keyName: string): void {
		localStorage.removeItem(keyName)
	}

	/**
	 * Rename a local storage key.
	 */
	#renameLocalStorageKey(oldKeyName: string, newKeyName: string): void {
		const value = localStorage.getItem(oldKeyName)
		if (value === null) {
			return
		}

		localStorage.setItem(newKeyName, value)
		localStorage.removeItem(oldKeyName)
	}

	/**
	 * Rename a key inside a JSON object stored in local storage.
	 */
	#updateLocalStorageJsonValuePropertyKey(
		operation: RenameJsonValuePropertyKey,
	): void {
		const valueAsObject = this.#parseLocalStorageJsonValue(operation.key)
		if (!valueAsObject) {
			return
		}

		if (operation.oldJsonKey in valueAsObject) {
			const updatedValueAsObject = omit(operation.oldJsonKey, {
				...valueAsObject,
				[operation.newJsonKey]: valueAsObject[operation.oldJsonKey],
			})
			const updatedValueAsJson = JSON.stringify(updatedValueAsObject)

			localStorage.setItem(operation.key, updatedValueAsJson)
		}
	}

	/**
	 * Update a value inside a JSON object stored in local storage.
	 */
	#updateLocalStorageJsonValuePropertyValue(
		operation: UpdateJsonValuePropertyValue,
	): void {
		const valueAsObject = this.#parseLocalStorageJsonValue(operation.key)
		if (!valueAsObject) {
			return
		}

		if (valueAsObject[operation.jsonKey] === operation.oldJsonValue) {
			const nextValueAsObject = {
				...valueAsObject,
				[operation.jsonKey]: operation.newJsonValue,
			}
			const nextValueAsJson = JSON.stringify(nextValueAsObject)

			localStorage.setItem(operation.key, nextValueAsJson)
		}
	}

	/**
	 * Parse a JSON value from a local storage key.
	 */
	#parseLocalStorageJsonValue(localStorageKey: string): AnyObject | undefined {
		const valueAsJson = localStorage.getItem(localStorageKey)
		if (valueAsJson === null) {
			return undefined
		}

		let valueAsObject: AnyObject
		try {
			valueAsObject = JSON.parse(valueAsJson)
		} catch {
			console.error(
				`[LocalStorageMigrator] Failed to parse JSON for local storage key \`${localStorageKey}\`.` +
					` Original JSON Value: "${valueAsJson}".`,
			)

			return undefined
		}
		if (!isPlainObject(valueAsObject)) {
			console.error(
				`[LocalStorageMigrator] Value for local storage key \`${localStorageKey}\` is not a plain object.` +
					` Original JSON Value: "${valueAsJson}".` +
					` Parsed Type: \`${typeof valueAsObject}\`.` +
					` Parsed Value: \`${JSON.stringify(valueAsObject)}\`.`,
			)

			return undefined
		}

		return valueAsObject
	}
}

export { LocalStorageMigrationOperationType }

export type {
	LocalStorageMigration,
	LocalStorageMigrationOperation,
} from "./types"
