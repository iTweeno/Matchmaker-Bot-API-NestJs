import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Base } from "./base";

@Schema({ collection: "teamsLeaderboard" })
export class TeamsLeaderboard extends Base {
	@Prop()
	name: string;

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

export type TeamsLeaderboardDocument = TeamsLeaderboard & Document;

export const TeamsLeaderboardSchema = SchemaFactory.createForClass(TeamsLeaderboard);
