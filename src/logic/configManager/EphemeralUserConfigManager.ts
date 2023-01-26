import { UserConfigManager } from '../UserConfigManager';

export class EphemeralUserConfigManager implements UserConfigManager {
	getBackendAddress(): string {
		return this.backendAddress;
	}

	isConfigManagerEphemeral(): boolean {
		return true;
	}

	setBackendAddress(addr: string): void {
		this.backendAddress = addr;
	}

	isConfigured(): boolean {
		return this.configured;
	}

	markConfigured() {
		this.configured = true;
	}

	private backendAddress = '';
	private configured = false;
}
