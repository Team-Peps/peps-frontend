export function isToday(matchDateStr: string): boolean {
	const today = new Date();
	const matchDate = new Date(matchDateStr);

	return (
		today.getFullYear() === matchDate.getFullYear() &&
		today.getMonth() === matchDate.getMonth() &&
		today.getDate() === matchDate.getDate()
	);
}

export function isNumeric(value: string): boolean {
	return !isNaN(Number(value)) && value.trim() !== '';
}

export function toNumber(value: string): number {
	return Number(value);
}

export function isSuperiorOf(a: string, b: string): boolean {
	return toNumber(a) > toNumber(b);
}

export function isWin(a: string): boolean {
	return a.includes('W');
}

export function isLoose(a: string): boolean {
	return a.includes('FF') || a.includes('L');
}
