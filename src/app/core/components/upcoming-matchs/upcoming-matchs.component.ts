import {Component, Input} from '@angular/core';
import {DatePipe, UpperCasePipe} from '@angular/common';
import {MatchRowComponent} from '../match-row/match-row.component';
import {isToday} from '../../utils/matchUtils';
import {ButtonComponent} from '../buttons/button/button.component';
import {RangePipe} from '../../../pipes/range.pipe';
import {Game} from '../../../models/game';
import {NoUpcomingMatchComponent} from '../no-upcoming-match/no-upcoming-match.component';
import {MatchGroupByDate} from '../../../models/match/matchGroupByDate';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'peps-upcoming-matchs',
	imports: [
		DatePipe,
		UpperCasePipe,
		MatchRowComponent,
		ButtonComponent,
		RangePipe,
		NoUpcomingMatchComponent,
		TranslatePipe
	],
  templateUrl: './upcoming-matchs.component.html',
})
export class UpcomingMatchsComponent {

	@Input() matches: MatchGroupByDate[] = [];

	protected readonly isToday = isToday;
	protected readonly Game = Game;
}
