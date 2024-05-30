import type { LocalStorageMigrationOperationType } from "./constants"

export type LocalStorageMigration = {
	description: string
	operations: LocalStorageMigrationOperation[]
}

export type LocalStorageMigrationOperation =
	| DeleteKey
	| RenameKey
	| RenameJsonValuePropertyKey
	| UpdateJsonValuePropertyValue

export type DeleteKey = {
	key: string
	type: LocalStorageMigrationOperationType.DeleteKey
}

export type RenameKey = {
	from: string
	to: string
	type: LocalStorageMigrationOperationType.RenameKey
}

export type RenameJsonValuePropertyKey = {
	key: string
	newJsonKey: string
	oldJsonKey: string
	type: LocalStorageMigrationOperationType.RenameJsonValuePropertyKey
}

export type UpdateJsonValuePropertyValue = {
	jsonKey: string
	key: string
	newJsonValue: string | number | boolean | null
	oldJsonValue: string | number | boolean | null
	type: LocalStorageMigrationOperationType.UpdateJsonPropertyValue
}
