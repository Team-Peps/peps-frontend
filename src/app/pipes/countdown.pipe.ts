import { Pipe, PipeTransform, ChangeDetectorRef, NgZone } from '@angular/core';

@Pipe({
	name: 'countdown',
	pure: false
})
export class CountdownPipe implements PipeTransform {
	private value: string | null = null;
	private timer: any;

	constructor(private ref: ChangeDetectorRef, private zone: NgZone) {}

	/**
	 * Transform the target date into a countdown string
	 * @param targetDate
	 */
	transform(targetDate: Date | string): string | null {
		if (!targetDate) return null;

		if (this.timer) {
			clearTimeout(this.timer);
		}

		const update = () => {
			const ms = this.getMsDifference(new Date(targetDate));
			this.value = this.formatCountdown(ms);
			this.ref.markForCheck();
		};

		this.zone.runOutsideAngular(() => {
			this.timer = setTimeout(() => update(), 1000);
		});

		update();

		return this.value;
	}

	/**
	 * Get the difference in milliseconds between the current date and the target date
	 * @param date
	 * @private
	 */
	private getMsDifference(date: Date): number {
		const now = Date.now();
		const target = new Date(date).getTime();
		return target - now;
	}

	/**
	 * Format the countdown in a human-readable format
	 * @param ms - milliseconds to format
	 * @returns formatted string
	 */
	private formatCountdown(ms: number): string | null {
		if (ms <= 0) return null;

		const seconds = Math.floor((ms / 1000) % 60);
		const minutes = Math.floor((ms / (1000 * 60)) % 60);
		const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
		const days = Math.floor(ms / (1000 * 60 * 60 * 24));

		const s = seconds < 10 ? '0' + seconds : seconds;
		const m = minutes < 10 ? '0' + minutes : minutes;
		const h = hours < 10 ? '0' + hours : hours;

		if (ms < 60 * 1000) {
			return `${s}s`;
		} else if (ms < 60 * 60 * 1000) {
			return `${m}m ${s}s`;
		} else if (ms < 24 * 60 * 60 * 1000) {
			return `${h}h ${m}m`;
		} else {
			return `${days}j ${h}h`;
		}
	}
}
