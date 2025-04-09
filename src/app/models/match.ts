export interface Match {
	id: string;
	datetime: string;
	game: string;
	opponent: string;
	competitionName: string;
	competitionImageKey: string;
	score: number;
	opponentScore: number;
	opponentImageKey: string;
	vodUrl: string;
	streamUrl: string;
}

export interface MatchGroupByDate {
	date: string;
	matches: Match[];
}
