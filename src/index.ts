// biome-ignore lint/performance/noBarrelFile: This is the main entry point for the package.
export { useLocalStorageMigrator } from "./hooks/useLocalStorageMigrator"

export {
	LocalStorageMigrator,
	OperationType,
	LAST_MIGRATION_VERSION_KEY,
	type LocalStorageMigration,
	type Operation,
} from "./libs/LocalStorageMigrator"
