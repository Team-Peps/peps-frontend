export function getImageByArticleType(articleType: string): string {
	switch (articleType) {
		case 'MARVEL_RIVALS':
			return '/assets/icons/Marvel_Rivals_logo.svg';
		case 'OVERWATCH':
			return '/assets/icons/Overwatch_2_logo.svg';
		case 'TEAM_PEPS':
			return '/assets/images/team_peps_logo.png';
		default:
			return '/assets/images/team_peps_logo.png';
	}
}
