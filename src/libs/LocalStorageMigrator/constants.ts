export enum OperationType {
	DeleteKey = "DeleteKey",
	RenameJsonValuePropertyKey = "RenameJsonValuePropertyKey",
	RenameKey = "RenameKey",
	UpdateJsonPropertyValue = "UpdateJsonPropertyValue",
}

export enum StorageType {
	LocalStorage = "LocalStorage",
}

export const LAST_MIGRATION_VERSION_KEY =
	"localStorageMigrator:lastMigrationVersion"
