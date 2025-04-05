import { Component } from '@angular/core';
import {ButtonSmallComponent} from '../buttons/button-small/button-small.component';

@Component({
	selector: 'peps-news-card',
	imports: [
		ButtonSmallComponent
	],
	templateUrl: './news-card.component.html',
})
export class NewsCardComponent {

}
