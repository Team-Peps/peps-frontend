import {Component, Input} from '@angular/core';
import {ButtonSmallComponent} from '../buttons/button-small/button-small.component';
import {environment} from '../../../../environment/environment';
import {ArticleTiny} from '../../../models/article/articleTiny';

@Component({
	selector: 'peps-news-card',
	imports: [
		ButtonSmallComponent
	],
	templateUrl: './news-card.component.html',
})
export class NewsCardComponent {

	@Input() article: ArticleTiny | null = null;

	minioBaseUrl = environment.minioBaseUrl;

}
