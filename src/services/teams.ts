import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

import { Teams, TeamsDocument } from "../schemas/teams";

@Injectable()
class TeamsService {
	constructor(
		@InjectModel(Teams.name)
		private readonly TeamsModel: Model<TeamsDocument>
	) {}

	public async getTeamsByGuildId(channelId: string): Promise<TeamsDocument[]> {
		return await this.TeamsModel.find({ channelId }); //cant be fucked adding pagination lol
	}
}
export default TeamsService;
