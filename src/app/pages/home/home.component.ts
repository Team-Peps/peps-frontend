import {Component, OnInit} from '@angular/core';
import {SliderComponent} from '../../core/components/slider/slider.component';
import {MaxButtonComponent} from '../../core/components/buttons/max-button/max-button.component';
import {TitleComponent} from '../../core/components/title/title.component';
import {CheckboxComponent} from '../../core/components/checkbox/checkbox.component';
import {MatchService} from '../../services/match.service';
import {MatchGroupByDate} from '../../models/match';
import {MatchRowComponent} from '../../core/components/match-row/match-row.component';
import {Game} from '../../models/game';
import {DatePipe, UpperCasePipe} from '@angular/common';
import {ButtonComponent} from '../../core/components/buttons/button/button.component';
import {Router} from '@angular/router';
import {ArticleService} from '../../services/article.service';
import {ArticleTiny} from '../../models/article';
import {NewsCardComponent} from '../../core/components/news-card/news-card.component';
import {RangePipe} from '../../pipes/range.pipe';

@Component({
  selector: 'app-home',
	imports: [
		SliderComponent,
		MaxButtonComponent,
		TitleComponent,
		CheckboxComponent,
		MatchRowComponent,
		DatePipe,
		UpperCasePipe,
		ButtonComponent,
		NewsCardComponent,
		RangePipe
	],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

	constructor(
		private readonly matchService: MatchService,
		private readonly router: Router,
		private readonly articleService: ArticleService,
	) {}

	protected readonly Game = Game;

	matchsUpcoming: MatchGroupByDate[] = [];
	filteredMatches: MatchGroupByDate[] = [];

	articles: ArticleTiny[] = [];

	selectedGames: string[] = [Game.MARVEL_RIVALS, Game.OVERWATCH];

	itemsSlider = [
		{ index: 0, link: "", images: { sm:'/assets/images/img1-mobile.png', lg:'assets/images/img1.png'} },
		{ index: 1, link: "", images: { sm:'/assets/images/img1-mobile.png', lg:'assets/images/img1.png'} },
		{ index: 2, link: "", images: { sm:'/assets/images/img1-mobile.png', lg:'assets/images/img1.png'} },
	];

	ngOnInit(): void {
		this.loadMatches();
		this.loadRecentArticles();
    }

	private loadMatches(): void {
		this.matchService.getUpcomingMatches().subscribe((data: MatchGroupByDate[]) => {
			this.matchsUpcoming = data;
			this.updateFilteredMatches();
		});
	}

	private loadRecentArticles() {
		this.articleService.getThreeRecentArticles().subscribe((data: ArticleTiny[]) => {
			this.articles = data;
		})
	}

	isToday(matchDateStr: string): boolean {
		const today = new Date();
		const matchDate = new Date(matchDateStr);

		return (
			today.getFullYear() === matchDate.getFullYear() &&
			today.getMonth() === matchDate.getMonth() &&
			today.getDate() === matchDate.getDate()
		);
	}

	updateFilteredMatches(): void {
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

	toggleGame(game: string, event: Event): void {
		const target = event.target as HTMLInputElement;
		const isChecked = target.checked;
		if(isChecked) {
			this.selectedGames.push(game);
		} else {
			this.selectedGames = this.selectedGames.filter(g => g !== game);
		}
		this.updateFilteredMatches();
	}

	toMatches() {
		this.router.navigate(['matchs']);
	}

	toNews() {
		this.router.navigate(['news']);
	}
}
