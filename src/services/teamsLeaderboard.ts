import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

import { TeamsLeaderboard, TeamsLeaderboardDocument } from "../schemas/teamsLeaderboard";
import { IPagination } from "src/types/base";

@Injectable()
class TeamsLeaderboardService {
	constructor(
		@InjectModel(TeamsLeaderboard.name)
		private readonly TeamsLeaderboardModel: Model<TeamsLeaderboardDocument>
	) {}

	public async getTeamsLeaderboardByChannelId(
		channelId: string,
		skip: number
	): Promise<IPagination<TeamsLeaderboardDocument[]>> {
		const data = await this.TeamsLeaderboardModel.find({ channelId })
			.skip(skip ?? 0)
			.limit(10)
			.sort({ mmr: -1 });
		const total = await this.TeamsLeaderboardModel.countDocuments({ channelId });
		return { total, data } as IPagination<TeamsLeaderboardDocument[]>;
	}

	public async getTeamsLeaderboardByGuildId(guildId: string, skip: number): Promise<TeamsLeaderboardDocument[]> {
		return await this.TeamsLeaderboardModel.find({ guildId })
			.skip(skip ?? 0)
			.limit(10);
	}
}
export default TeamsLeaderboardService;
