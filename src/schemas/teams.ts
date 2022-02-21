import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Base } from "./base";

@Schema()
export class Teams extends Base {
	@Prop()
	name: string;

	@Prop()
	guildId: string;

	@Prop()
	captain: string;

	@Prop([String])
	memberIds: string[];
}

export type TeamsDocument = Teams & Document;

export const TeamsSchema = SchemaFactory.createForClass(Teams);
