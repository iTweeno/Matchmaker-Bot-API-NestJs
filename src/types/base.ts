import { ObjectId } from "bson";

type UpdateOptions<T> = Partial<Omit<T, "_id" | "guildId" | "userId" | "channelId">>;

interface IUpdateResult {
	acknowledged: boolean;

	matchedCount: number;

	modifiedCount: number;

	upsertedCount: number;

	upsertedId: ObjectId;
}

interface IGuilds {
	id: string;
	name: string;
	icon: string;
}

export { UpdateOptions, IUpdateResult, IGuilds };
