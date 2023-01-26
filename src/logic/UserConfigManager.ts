import { LocalStorageBasedUserConfigManager } from './configManager/LocalStorageBasedUserConfigManager';
import { EphemeralUserConfigManager } from './configManager/EphemeralUserConfigManager';

export interface UserConfigManager {
	getBackendAddress(): string;

	setBackendAddress(addr: string): void;

	isConfigManagerEphemeral(): boolean;

	isConfigured(): boolean;

	markConfigured(): void;
}

const UserConfigManager = window.localStorage ? new LocalStorageBasedUserConfigManager() : new EphemeralUserConfigManager();

export default UserConfigManager;
