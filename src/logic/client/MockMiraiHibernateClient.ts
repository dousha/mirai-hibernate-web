import { MiraiHibernateClient } from '../MiraiHibernateClient';
import { MessageFilterOptions, MessageRecord } from '../../types';
import AccountInfo from '../model/AccountInfo';
import { GroupInfo } from '../model/GroupInfo';

export class MockMiraiHibernateClient implements MiraiHibernateClient {
	addTagToSticker(stickerHash: string, tag: string): Promise<null> {
		return Promise.resolve(null);
	}

	fetchBots(): Promise<Array<AccountInfo>> {
		return Promise.resolve([
			{
				id: 123456789,
				nickname: 'TestAcct',
			},
		]);
	}

	fetchGroups(bot: number): Promise<Array<GroupInfo>> {
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
