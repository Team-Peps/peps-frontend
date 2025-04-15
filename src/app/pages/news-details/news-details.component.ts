import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../../models/article/article';
import {DomSanitizer, SafeHtml, Title} from '@angular/platform-browser';
import {environment} from '../../../environment/environment';
import {DatePipe} from '@angular/common';
import {ButtonSmallComponent} from '../../core/components/buttons/button-small/button-small.component';
import {ToastService} from '../../services/toast.service';
import {SeparatorComponent} from '../../core/components/separator/separator.component';
import {getImageByArticleType} from '../../core/utils/articleUtils';

@Component({
  selector: 'app-news-details',
	imports: [
		DatePipe,
		ButtonSmallComponent,
		SeparatorComponent
	],
  templateUrl: './news-details.component.html',
})
export class NewsDetailsComponent implements OnInit {

	constructor(
		private readonly articleService: ArticleService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly sanitizer: DomSanitizer,
		private readonly router: Router,
		protected readonly toastService: ToastService,
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
					this.toastService.show("L'article n'existe pas", 'error');
					this.router.navigate(['/news']);
				}
			});
		}
	}

}
