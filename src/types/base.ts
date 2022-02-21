import { ObjectId } from "bson";

type UpdateOptions<T> = Partial<Omit<T, "_id" | "guildId" | "userId" | "channelId">>;

interface IUpdateResult {
	acknowledged: boolean;

	matchedCount: number;

	modifiedCount: number;

	upsertedCount: number;

	upsertedId: ObjectId;
}

interface IDiscordOauth2 {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
}
interface IGuilds {
	id: string;
	name: string;
	icon: string;
}
export { UpdateOptions, IUpdateResult, IDiscordOauth2, IGuilds };
