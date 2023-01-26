import {MessageFilterOptions, MessageRecord} from "../types";

export interface MiraiHibernateClient {
    fetchBots(): Promise<Array<number>>;

    fetchGroups(bot: number): Promise<Array<number>>;

    fetchUsers(bot: number): Promise<Array<number>>;

    fetchMessages(filter: MessageFilterOptions): Promise<Array<MessageRecord>>;

    fetchRandomSticker(): Promise<string>;

    fetchSticker(hash: string): Promise<string>;

    addTagToSticker(stickerHash: string, tag: string): Promise<null>;

    removeTagFromSticker(stickerHash: string, tag: string): Promise<null>;

    removeSticker(hash: string): Promise<null>;
}
