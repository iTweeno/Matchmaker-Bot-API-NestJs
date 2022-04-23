import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";

import TeamsLeaderboardService from "../services/teamsLeaderboard";

@Controller("leaderboards/teams")
export class TeamsLeaderboardController {
	private _TeamsLeaderboardService: TeamsLeaderboardService;

	constructor(TeamsLeaderboardService: TeamsLeaderboardService) {
		this._TeamsLeaderboardService = TeamsLeaderboardService;
	}

	@Get("channel/:channelId")
	async getTeamsLeaderboardByChannelId(
		@Param("channelId") channelId: string,
		@Query("skip", ParseIntPipe) skip: number
	) {
		return await this._TeamsLeaderboardService.getTeamsLeaderboardByChannelId(channelId, skip);
	}
}

export default TeamsLeaderboardController;
