import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Gets the directory name for the current ES module
 * @param url - The import.meta.url from the calling module
 * @returns The directory path of the current module
 */
export function getDirname(url: string): string {
	return dirname(fileURLToPath(url));
}
