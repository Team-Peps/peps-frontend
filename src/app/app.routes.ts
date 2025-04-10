import { Routes } from '@angular/router';
import {TestComponent} from './pages/test/test.component';
import {HomeComponent} from './pages/home/home.component';
import {NewsComponent} from './pages/news/news.component';
import {NewsDetailsComponent} from './pages/news-details/news-details.component';

export const routes: Routes = [
	{
		path: 'test',
		component: TestComponent,
	},
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'rosters',
		children: [
			{
				path: 'overwatch',
				component: TestComponent,
			},
			{
				path: 'marvel-rivals',
				component: TestComponent,
			}
		]
	},
	{
		path: 'news',
		children: [
			{
				path: '',
				component: NewsComponent,
			},
			{
				path: ':articleId',
				component: NewsDetailsComponent,
			}
		]
	}
];
