import {Component, Input} from '@angular/core';
import {LogoComponent} from '../logo/logo.component';
import {Match} from '../../../models/match';
import {environment} from '../../../../environment/environment';
import {DatePipe} from '@angular/common';
import {CountdownPipe} from '../../../pipes/countdown.pipe';

@Component({
  selector: 'peps-match-row',
	imports: [
		LogoComponent,
		DatePipe,
		CountdownPipe
	],
  templateUrl: './match-row.component.html',
})
export class MatchRowComponent {

	@Input() match: Match | null = null;

	minioBaseUrl = environment.minioBaseUrl;

	/**
	 * Check if the match is in the past
	 * @param date
	 * @returns {boolean}
	 */
	isPastDate(date: string): boolean {
		const currentDate = new Date();
		const matchDate = new Date(date);
		return matchDate < currentDate;
	}

}
