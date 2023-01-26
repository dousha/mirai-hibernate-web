import { MiraiHibernateClient } from '../MiraiHibernateClient';
import { MessageFilterOptions, MessageRecord } from '../../types';
import AccountInfo from '../model/AccountInfo';

export class RealMiraiHibernateClient implements MiraiHibernateClient {
	addTagToSticker(stickerHash: string, tag: string): Promise<null> {
		return Promise.resolve(null);
	}

	fetchBots(): Promise<Array<AccountInfo>> {
		return Promise.resolve([]);
	}

	fetchGroups(bot: number): Promise<Array<number>> {
		return Promise.resolve([]);
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

	fetchUsers(bot: number): Promise<Array<AccountInfo>> {
		return Promise.resolve([]);
	}

	removeSticker(hash: string): Promise<null> {
		return Promise.resolve(null);
	}

	removeTagFromSticker(stickerHash: string, tag: string): Promise<null> {
		return Promise.resolve(null);
	}
}
