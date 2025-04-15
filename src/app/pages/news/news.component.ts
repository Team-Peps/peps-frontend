import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {NewsCardComponent} from '../../core/components/news-card/news-card.component';
import {TitleComponent} from '../../core/components/title/title.component';
import {PageSelectorComponent} from '../../core/components/page-selector/page-selector.component';
import {CheckboxComponent} from '../../core/components/checkbox/checkbox.component';
import {ArticleType} from '../../models/article/articleType';
import {ToastService} from '../../services/toast.service';
import {Title} from '@angular/platform-browser';
import {ArticleTiny} from '../../models/article/articleTiny';

@Component({
  selector: 'app-news',
	imports: [
		NewsCardComponent,
		TitleComponent,
		PageSelectorComponent,
		CheckboxComponent
	],
  templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit {

	constructor(
		private readonly articleService: ArticleService,
		private readonly toastService: ToastService,
		private readonly titleService: Title,
	) {}

	protected readonly ArticleType = ArticleType;

	articles: ArticleTiny[] = [];
	page: number = 0;
	totalPages: number = 0;
	filter: ArticleType[] = [ArticleType.TEAM_PEPS, ArticleType.MARVEL_RIVALS, ArticleType.OVERWATCH];

	ngOnInit(): void {
		this.loadArticles();
		this.titleService.setTitle('Team Peps - Les Actus');
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	loadArticles(): void {
		this.articleService.getArticles(this.page, this.filter.sort((a, b) => a.localeCompare(b))).subscribe(response => {
			this.articles = response.content;
			this.totalPages = response.totalPages;
		});
	}

	onPageChange(newPage: number) {
		this.page = newPage;
		this.loadArticles();
	}

	filterArticles(articleType: ArticleType, checked: boolean): void {
		const index = this.filter.indexOf(articleType);

		if (checked) {
			if (index === -1) {
				this.filter = [...this.filter, articleType];
			}
		} else {
			const updatedFilter = this.filter.filter(t => t !== articleType);

			if (updatedFilter.length === 0) {
				this.filter = [ArticleType.TEAM_PEPS];
				this.toastService.show('Vous devez garder au moins une catégorie d\'article sélectionnée.', 'info');
				this.loadArticles();
				return;
			}

			this.filter = updatedFilter;
		}

		this.loadArticles();
	}

}
