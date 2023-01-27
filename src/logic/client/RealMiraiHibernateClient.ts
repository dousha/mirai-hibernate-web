import { MiraiHibernateClient } from '../MiraiHibernateClient';
import { MessageFilterOptions, MessageRecord } from '../../types';
import AccountInfo from '../model/AccountInfo';
import UserConfigManager from '../UserConfigManager';
import { GroupInfo } from '../model/GroupInfo';

export class RealMiraiHibernateClient implements MiraiHibernateClient {
	private async fetchData(url: string): Promise<any> {
		const response = await fetch(url);
		const data = await response.json();
		if (data.code !== 0) {
			throw new Error(data);
		}

		return data.data;
	}

	addTagToSticker(stickerHash: string, tag: string): Promise<null> {
		return Promise.resolve(null);
	}

	async fetchBots(): Promise<Array<AccountInfo>> {
		const path = `${UserConfigManager.getBackendAddress()}/archive/bot`;

		try {
			const data = await this.fetchData(path);
			return (data as number[]).map(it => {
				return {
					id: it,
					nickname: it.toString(), // FIXME: we should be able to get nick names
				};
			});
		} catch (e) {
			console.error(e);
			return [];
		}
	}

	async fetchGroups(bot: number): Promise<Array<GroupInfo>> {
		const path = `${UserConfigManager.getBackendAddress()}/archive/group?bot=${bot}`;
		try {
			const data = await this.fetchData(path);
			return (data as number[]).map(it => {
				return {
					id: it,
					nickname: it.toString(), // FIXME: should somehow get nick name of a group
				};
			});
		} catch (e) {
			console.error(e);
			return [];
		}
	}

	fetchMessages(filter: MessageFilterOptions): Promise<Array<MessageRecord>> {
		return Promise.resolve([]);
	}

	fetchRandomSticker(): Promise<string> {
		return Promise.resolve('');
	}

	fetchSticker(hash: string): Promise<string> {
		return Promise.resolve('');
	}

	async fetchUsers(bot: number): Promise<Array<AccountInfo>> {
		const path = `${UserConfigManager.getBackendAddress()}/archive/user?bot=${bot}`;
		try {
			const data = await this.fetchData(path);
			return (data as number[]).map(it => {
				return {
					id: it,
					nickname: it.toString(), // FIXME: should somehow get nick name of a group
				};
			});
		} catch (e) {
			console.error(e);
			return [];
		}
	}

	removeSticker(hash: string): Promise<null> {
		return Promise.resolve(null);
	}

	removeTagFromSticker(stickerHash: string, tag: string): Promise<null> {
		return Promise.resolve(null);
	}
}
