import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TitleComponent} from '@components/title/title.component';
import {DatePipe, NgClass, UpperCasePipe} from '@angular/common';
import {CheckboxComponent} from '@components/checkbox/checkbox.component';
import {Game} from '@models/game';
import {ToggleComponent} from '@components/toggle/toggle.component';
import {MatchService} from '@services/match.service';
import {MatchRowComponent} from '@components/match-row/match-row.component';
import {RangePipe} from '../../pipes/range.pipe';
import {isToday} from '../../core/utils/matchUtils';
import {PageSelectorComponent} from '@components/page-selector/page-selector.component';
import {NoUpcomingMatchComponent} from '@components/no-upcoming-match/no-upcoming-match.component';
import {Title} from '@angular/platform-browser';
import {MatchGroupByDate} from '@models/match/matchGroupByDate';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

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
		NoUpcomingMatchComponent,
		TranslatePipe
	],
  templateUrl: './matchs.component.html',
})
export class MatchsComponent implements OnInit {

	constructor(
		private readonly matchService: MatchService,
		private readonly cdr: ChangeDetectorRef,
		private readonly titleService: Title,
		private readonly translate: TranslateService
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
		this.titleService.setTitle(this.translate.instant('page.matchs.title'));
		this.loadUpcomingMatches();
	}

	loadUpcomingMatches(): void {
		this.matchService.getUpcomingMatches(this.page, this.selectedGames.toSorted((a, b) => a.localeCompare(b))).subscribe({
			next: (matches) => {
				this.matchsUpcoming = matches.content;
				this.totalPages = matches.totalPages;
				this.updateFilteredMatches();
			}
		});
	}

	loadResultMatches(): void {
		this.matchService.getResultMatches(this.page, this.selectedGames.toSorted((a, b) => a.localeCompare(b))).subscribe({
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
