import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

import { TeamsLeaderboard, TeamsLeaderboardDocument } from "../schemas/teamsLeaderboard";
import { Pagination } from "src/types/base";

@Injectable()
class TeamsLeaderboardService {
	constructor(
		@InjectModel(TeamsLeaderboard.name)
		private readonly TeamsLeaderboardModel: Model<TeamsLeaderboardDocument>
	) {}

	public async getTeamsLeaderboardByChannelId(
		channelId: string,
		skip: number
	): Promise<Pagination<TeamsLeaderboardDocument[]>> {
		const data = await this.TeamsLeaderboardModel.find({ channelId })
			.skip(skip ?? 0)
			.limit(10)
			.sort({ mmr: -1, wins: -1 });
		const total = await this.TeamsLeaderboardModel.countDocuments({ channelId });
		return { total, data } as Pagination<TeamsLeaderboardDocument[]>;
	}
}
export default TeamsLeaderboardService;
