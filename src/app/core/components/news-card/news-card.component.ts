import {Component, Input} from '@angular/core';
import {ButtonSmallComponent} from '../buttons/button-small/button-small.component';
import {environment} from '@/environments/environment';
import {ArticleTiny} from '@models/article/articleTiny';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
	selector: 'peps-news-card',
	imports: [
		ButtonSmallComponent,
		TranslatePipe
	],
	templateUrl: './news-card.component.html',
})
export class NewsCardComponent {

	@Input() article: ArticleTiny | null = null;

	minioBaseUrl = environment.minioBaseUrl;

}
