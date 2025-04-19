import {Component, OnInit} from '@angular/core';
import {ArticleService} from '@services/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '@models/article/article';
import {DomSanitizer, SafeHtml, Title} from '@angular/platform-browser';
import {environment} from '@/environments/environment';
import {DatePipe} from '@angular/common';
import {ButtonSmallComponent} from '@components/buttons/button-small/button-small.component';
import {SeparatorComponent} from '@components/separator/separator.component';
import {getImageByArticleType} from '../../core/utils/articleUtils';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-news-details',
	imports: [
		DatePipe,
		ButtonSmallComponent,
		SeparatorComponent,
		TranslatePipe
	],
  templateUrl: './news-details.component.html',
})
export class NewsDetailsComponent implements OnInit {

	constructor(
		private readonly articleService: ArticleService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly sanitizer: DomSanitizer,
		private readonly router: Router,
		private readonly titleService: Title,
	) { }

	minioBaseUrl = environment.minioBaseUrl;
	articleId: string | null = null;
	article: Article | null = null;
	safeHtml: SafeHtml = '';

	protected readonly getImageByArticleType = getImageByArticleType;

	ngOnInit(): void {
		this.activatedRoute.paramMap.subscribe(paramMap => {
			this.articleId = paramMap.get('articleId');
			this.loadArticle()
		})
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	private loadArticle() {
		if (this.articleId) {
			this.articleService.getArticle(this.articleId).subscribe({
				next: (article) => {
					this.article = article;
					this.titleService.setTitle('Team Peps - ' + article.title);
					this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(article.content)
				},
				error: () => {
					this.router.navigate(['/not-found']);
				}
			});
		}
	}

}
