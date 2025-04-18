import {Component, Input} from '@angular/core';
import {LogoComponent} from '../logo/logo.component';
import {Match} from '@models/match/match';
import {environment} from '@/environments/environment';
import {DatePipe, NgClass} from '@angular/common';
import {CountdownPipe} from '@/app/pipes/countdown.pipe';
import {isLoose, isNumeric, isPastDate, isSuperiorOf, isWin} from '../../utils/matchUtils';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'peps-match-row',
	imports: [
		LogoComponent,
		DatePipe,
		CountdownPipe,
		NgClass,
		TranslatePipe
	],
  templateUrl: './match-row.component.html',
})
export class MatchRowComponent {

	@Input() match: Match | null = null;
	@Input() isShowingScore: boolean = false;

	minioBaseUrl = environment.minioBaseUrl;

	protected readonly isNumeric = isNumeric;
	protected readonly isSuperiorOf = isSuperiorOf;
	protected readonly isWin = isWin;
	protected readonly isLoose = isLoose;

	protected readonly isPastDate = isPastDate;
}
