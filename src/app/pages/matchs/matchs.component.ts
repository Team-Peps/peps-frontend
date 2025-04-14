import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TitleComponent} from '../../core/components/title/title.component';
import {DatePipe, NgClass, UpperCasePipe} from '@angular/common';
import {CheckboxComponent} from '../../core/components/checkbox/checkbox.component';
import {Game} from '../../models/game';
import {ToggleComponent} from '../../core/components/toggle/toggle.component';
import {MatchService} from '../../services/match.service';
import {MatchRowComponent} from '../../core/components/match-row/match-row.component';
import {RangePipe} from '../../pipes/range.pipe';
import {isToday} from '../../core/utils/matchUtils';
import {MatchGroupByDate} from '../../models/match';
import {PageSelectorComponent} from '../../core/components/page-selector/page-selector.component';
import {NoUpcomingMatchComponent} from '../../core/components/no-upcoming-match/no-upcoming-match.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-matchs',
	imports: [
		TitleComponent,
		CheckboxComponent,
		ToggleComponent,
		NgClass,
		DatePipe,
		MatchRowComponent,
		RangePipe,
		UpperCasePipe,
		PageSelectorComponent,
		NoUpcomingMatchComponent
	],
  templateUrl: './matchs.component.html',
})
export class MatchsComponent implements OnInit {

	constructor(
		private readonly matchService: MatchService,
		private readonly cdr: ChangeDetectorRef,
		private readonly titleService: Title,
	) { }

	protected readonly Game = Game;
	protected readonly isToday = isToday;

	selectedGames: string[] = [Game.MARVEL_RIVALS, Game.OVERWATCH];
	selectedTypeOfMatch: 'upcoming' | 'result' = 'upcoming';

	isShowingScore: boolean = false;

	matchsUpcoming: MatchGroupByDate[] = [];
	matchsResult: MatchGroupByDate[] = [];
	filteredMatches: MatchGroupByDate[] = [];

	page: number = 0;
	totalPages: number = 0;

	ngOnInit(): void {
		this.titleService.setTitle('Team Peps - Matchs');
		this.loadUpcomingMatches();
	}

	loadUpcomingMatches(): void {
		this.matchService.getUpcomingMatches(this.page, this.selectedGames).subscribe({
			next: (matches) => {
				this.matchsUpcoming = matches.content;
				this.totalPages = matches.totalPages;
				this.updateFilteredMatches();
			}
		});
	}

	loadResultMatches(): void {
		this.matchService.getResultMatches(this.page, this.selectedGames).subscribe({
			next: (matches) => {
				this.matchsResult = matches.content;
				this.totalPages = matches.totalPages;
				this.updateFilteredMatches();
			}
		});
	}

	updateFilteredMatches(): void {
		if(this.selectedTypeOfMatch === 'result') {
			this.filteredMatches = this.matchsResult
				.map(group => {
					const filtered = group.matches.filter(match =>
						this.selectedGames.includes(match.game)
					);
					return {
						date: group.date,
						matches: filtered
					};
				})
				.filter(group => group.matches.length > 0);
			return;
		} else{
			this.filteredMatches = this.matchsUpcoming
				.map(group => {
					const filtered = group.matches.filter(match =>
						this.selectedGames.includes(match.game)
					);
					return {
						date: group.date,
						matches: filtered
					};
				})
				.filter(group => group.matches.length > 0);
		}

	}

	toggleGame(game: Game, isChecked: boolean): void {
		if(isChecked) {
			this.selectedGames.push(game);
		} else {
			this.selectedGames = this.selectedGames.filter(g => g !== game);
		}
		this.updateFilteredMatches();
	}

	toggleTypeOfMatch(type: 'upcoming' | 'result'): void {
		this.selectedTypeOfMatch = type;
		this.page = 0;
		if(type === 'result') {
			this.loadResultMatches();
		} else {
			this.loadUpcomingMatches();
		}

		this.updateFilteredMatches();
	}

	toggleScoreVisibility(isChecked: boolean): void {
		this.isShowingScore = isChecked;
		this.cdr.detectChanges();
	}

	onPageChange(newPage: number) {
		this.page = newPage;
		this.loadResultMatches();
	}
}
