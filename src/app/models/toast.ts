export interface Toast {
	message: string;
	type?: 'success' | 'error' | 'info';
	duration?: number;
	id: number;
}
