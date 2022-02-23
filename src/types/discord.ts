interface IDiscordBasicInformation {
	id: string;
	name: string;
	icon: string;
	owner: boolean;
	permissions: string;
	features: string[];
}

interface IDiscordError {
	code: number;
	error: string;
}

interface IDiscordOauth2 {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
}

export { IDiscordBasicInformation, IDiscordError, IDiscordOauth2 };
