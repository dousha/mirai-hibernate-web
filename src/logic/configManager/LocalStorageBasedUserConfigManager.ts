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
		return window.localStorage.getItem(this.CONFIGURATION_MARK) != null;
	}

	markConfigured() {
		window.localStorage.setItem(this.CONFIGURATION_MARK, '1');
	}

	private readonly BACKEND_ADDRESS_KEY = 'backendAddress';
	private readonly CONFIGURATION_MARK = 'configured';
}
