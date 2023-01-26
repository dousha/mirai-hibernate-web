import { UserConfigManager } from '../UserConfigManager';

export class LocalStorageBasedUserConfigManager implements UserConfigManager {
	getBackendAddress(): string {
		return window.localStorage.getItem(this.BACKEND_ADDRESS_KEY) || '';
	}

	isConfigManagerEphemeral(): boolean {
		return false;
	}

	setBackendAddress(addr: string): void {
		window.localStorage.setItem(this.BACKEND_ADDRESS_KEY, addr);
	}

	isConfigured(): boolean {
		return this.getBackendAddress().trim().length > 0;
	}

	markConfigured() {
		// NOP
	}

	private readonly BACKEND_ADDRESS_KEY = 'backendAddress';
}
