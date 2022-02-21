import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Base } from "./base";

@Schema({ collection: "solosLeaderboard" })
export class SolosLeaderboard extends Base {
	@Prop()
	userId: string;

	@Prop()
	username: string;

	@Prop()
	guildId: string;

	@Prop()
	channelId: string;

	@Prop({ default: 0 })
	wins: number;

	@Prop({ default: 0 })
	losses: number;

	@Prop({ default: 1000 })
	mmr: number;
}

export type SolosLeaderboardDocument = SolosLeaderboard & Document;

export const SolosLeaderboardSchema = SchemaFactory.createForClass(SolosLeaderboard);
