import { MiraiHibernateClient } from '../MiraiHibernateClient';
import {
	BotFilterOptions,
	DirectMessageFilterOptions,
	GroupMessageFilterOptions,
	isBotFilterOptions,
	isDirectMessageFilterOptions,
	isGroupMessageFilterOptions,
	isKindFilterOptions,
	isTemporaryMessageFilterOptions,
	KindFilterOptions,
	MessageFilterOptions,
	MessageRecord,
	TemporaryMessageFilterOptions,
} from '../../types';
import AccountInfo from '../model/AccountInfo';
import UserConfigManager from '../UserConfigManager';
import { GroupInfo } from '../model/GroupInfo';

export class RealMiraiHibernateClient implements MiraiHibernateClient {
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

	async fetchMessages(filter: MessageFilterOptions): Promise<Array<MessageRecord>> {
		if (isKindFilterOptions(filter)) {
			return this.fetchMessagesByKind(filter);
		}

		if (isTemporaryMessageFilterOptions(filter)) {
			return this.fetchMessagesByTemporarySession(filter);
		}

		if (isGroupMessageFilterOptions(filter)) {
			return this.fetchMessagesByGroup(filter);
		}

		if (isDirectMessageFilterOptions(filter)) {
			return this.fetchMessagesByFriend(filter);
		}

		if (isBotFilterOptions(filter)) {
			return this.fetchMessagesByBot(filter);
		}

		console.error('filter does not match any');
		return [];
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

	private async fetchData(url: string): Promise<any> {
		const response = await fetch(url);
		const data = await response.json();
		if (data.code !== 0) {
			throw new Error(data);
		}

		return data.data;
	}

	private async fetchMessage(url: string): Promise<Array<MessageRecord>> {
		const data = await this.fetchData(url);
		return data as MessageRecord[];
	}

	private async fetchMessagesByKind(filter: KindFilterOptions): Promise<Array<MessageRecord>> {
		return this.fetchMessage(`${UserConfigManager.getBackendAddress()}/message/kind?kind=${filter.kind}&start=${filter.from}&end=${filter.to}`);
	}

	private async fetchMessagesByBot(filter: BotFilterOptions): Promise<Array<MessageRecord>> {
		return this.fetchMessage(`${UserConfigManager.getBackendAddress()}/message/bot?bot=${filter.bot}&start=${filter.from}&end=${filter.to}`);
	}

	private async fetchMessagesByGroup(filter: GroupMessageFilterOptions): Promise<Array<MessageRecord>> {
		return this.fetchMessage(`${UserConfigManager.getBackendAddress()}/message/group?bot=${filter.bot}&group=${filter.group}&start=${filter.from}&end=${filter.to}`);
	}

	private async fetchMessagesByFriend(filter: DirectMessageFilterOptions): Promise<Array<MessageRecord>> {
		return this.fetchMessage(`${UserConfigManager.getBackendAddress()}/message/group?bot=${filter.bot}&friend=${filter.account}&start=${filter.from}&end=${filter.to}`);
	}

	private async fetchMessagesByTemporarySession(filter: TemporaryMessageFilterOptions): Promise<Array<MessageRecord>> {
		return this.fetchMessage(`${UserConfigManager.getBackendAddress()}/message/member?bot=${filter.bot}&group=${filter.group}&member=${filter.account}&start=${filter.from}&end=${filter.to}`);
	}
}
