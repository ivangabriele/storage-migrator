export enum LocalStorageMigrationOperationType {
	DeleteKey = "DeleteKey",
	RenameJsonValuePropertyKey = "RenameJsonValuePropertyKey",
	RenameKey = "RenameKey",
	UpdateJsonPropertyValue = "UpdateJsonPropertyValue",
}

export const LAST_MIGRATION_VERSION_KEY =
	"localStorageMigrator:lastMigrationVersion"
