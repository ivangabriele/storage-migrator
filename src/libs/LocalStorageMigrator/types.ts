import type { OperationType, StorageType } from "./constants"

export type LocalStorageMigration = {
	description: string
	operations: Operation[]
}

export type Operation =
	| DeleteKey
	| RenameKey
	| RenameJsonValuePropertyKey
	| UpdateJsonValuePropertyValue

export type DeleteKey = {
	key: string
	type: OperationType.DeleteKey
	storageType: StorageType
}

export type RenameKey = {
	from: string
	to: string
	storageType: StorageType
	type: OperationType.RenameKey
}

export type RenameJsonValuePropertyKey = {
	key: string
	newJsonKey: string
	oldJsonKey: string
	storageType: StorageType
	type: OperationType.RenameJsonValuePropertyKey
}

export type UpdateJsonValuePropertyValue = {
	jsonKey: string
	key: string
	newJsonValue: string | number | boolean | null
	oldJsonValue: string | number | boolean | null
	storageType: StorageType
	type: OperationType.UpdateJsonPropertyValue
}
