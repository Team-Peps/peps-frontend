import {Component, OnInit} from '@angular/core';
import {SliderComponent} from '../../core/components/slider/slider.component';
import {MaxButtonComponent} from '../../core/components/buttons/max-button/max-button.component';
import {TitleComponent} from '../../core/components/title/title.component';
import {CheckboxComponent} from '../../core/components/checkbox/checkbox.component';
import {MatchService} from '../../services/match.service';
import {Game} from '../../models/game';
import {ButtonComponent} from '../../core/components/buttons/button/button.component';
import {ArticleService} from '../../services/article.service';
import {NewsCardComponent} from '../../core/components/news-card/news-card.component';
import {Title} from '@angular/platform-browser';
import {UpcomingMatchsComponent} from '../../core/components/upcoming-matchs/upcoming-matchs.component';
import {SliderService} from '../../services/slider.service';
import {Slider} from '../../models/slider';
import {ArticleTiny} from '../../models/article/articleTiny';
import {MatchGroupByDate} from '../../models/match/matchGroupByDate';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
	imports: [
		SliderComponent,
		MaxButtonComponent,
		TitleComponent,
		ButtonComponent,
		NewsCardComponent,
		CheckboxComponent,
		UpcomingMatchsComponent,
		TranslatePipe
	],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

	constructor(
		private readonly matchService: MatchService,
		private readonly sliderService: SliderService,
		private readonly articleService: ArticleService,
		private readonly titleService: Title,
	) {}

	protected readonly Game = Game;

	matchsUpcoming: MatchGroupByDate[] = [];
	filteredMatches: MatchGroupByDate[] = [];

	articles: ArticleTiny[] = [];
	sliders: Slider[] = [];

	selectedGames: string[] = [Game.MARVEL_RIVALS, Game.OVERWATCH];

	ngOnInit(): void {
		this.titleService.setTitle('Team Peps');
		this.loadMatches();
		this.loadRecentArticles();
		this.loadSliders();
    }

	private loadMatches(): void {
		this.matchService.get5UpcomingMatches().subscribe((data: MatchGroupByDate[]) => {
			this.matchsUpcoming = data;
			this.updateFilteredMatches();
		});
	}

	private loadRecentArticles() {
		this.articleService.getThreeRecentArticles().subscribe((data: ArticleTiny[]) => {
			this.articles = data;
		})
	}

	private loadSliders() {
		this.sliderService.getAllActiveSlider().subscribe((data: Slider[]) => {
			this.sliders = data;
		})
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

	toggleGame(game: Game, isChecked: boolean): void {
		if(isChecked) {
			this.selectedGames.push(game);
		} else {
			this.selectedGames = this.selectedGames.filter(g => g !== game);
		}
		this.updateFilteredMatches();
	}

}
