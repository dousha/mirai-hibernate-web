import { MessageFilterOptions, MessageRecord } from '../types';
import env from 'react-dotenv';
import { MockMiraiHibernateClient } from './client/MockMiraiHibernateClient';
import { RealMiraiHibernateClient } from './client/RealMiraiHibernateClient';
import AccountInfo from './model/AccountInfo';
import { GroupInfo } from './model/GroupInfo';

export interface MiraiHibernateClient {
    fetchBots(): Promise<Array<AccountInfo>>;

    fetchGroups(bot: number): Promise<Array<GroupInfo>>;

    fetchUsers(bot: number): Promise<Array<AccountInfo>>;

    fetchMessages(filter: MessageFilterOptions): Promise<Array<MessageRecord>>;

    fetchRandomSticker(): Promise<string>;

    fetchSticker(hash: string): Promise<string>;

    addTagToSticker(stickerHash: string, tag: string): Promise<null>;

    removeTagFromSticker(stickerHash: string, tag: string): Promise<null>;

    removeSticker(hash: string): Promise<null>;
}

export const MiraiClient = env.STATUS === 'dev' ? new MockMiraiHibernateClient() : new RealMiraiHibernateClient();
