import { LocalStorageMigrator } from "@libs/LocalStorageMigrator"
import { useEffect, useRef } from "react"

import type { LocalStorageMigration } from "@libs/LocalStorageMigrator/types"

export function useLocalStorageMigrator(migrations: LocalStorageMigration[]) {
	const localStorageMigratorRef = useRef(new LocalStorageMigrator(migrations))

	useEffect(() => {
		localStorageMigratorRef.current.run()
	}, [])
}
