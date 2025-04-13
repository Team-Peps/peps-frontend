import { Routes } from '@angular/router';
import {TestComponent} from './pages/test/test.component';
import {HomeComponent} from './pages/home/home.component';
import {NewsComponent} from './pages/news/news.component';
import {NewsDetailsComponent} from './pages/news-details/news-details.component';
import {AmbassadorsComponent} from './pages/ambassadors/ambassadors.component';
import {PartnersComponent} from './pages/partners/partners.component';
import {MatchsComponent} from './pages/matchs/matchs.component';
import {ClubComponent} from './pages/club/club.component';
import {RosterOverwatchComponent} from './pages/rosters/roster-overwatch/roster-overwatch.component';
import {RosterMarvelRivalsComponent} from './pages/rosters/roster-marvel-rivals/roster-marvel-rivals.component';

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
		path: 'roster',
		children: [
			{
				path: "",
				redirectTo: "/",
				pathMatch: "full"
			},
			{
				path: 'overwatch',
				component: RosterOverwatchComponent,
			},
			{
				path: 'marvel-rivals',
				component: RosterMarvelRivalsComponent,
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
	},
	{
		path: 'ambassadors',
		component: AmbassadorsComponent
	},
	{
		path: 'partners',
		component: PartnersComponent,
	},
	{
		path: 'matchs',
		component: MatchsComponent,
	},
	{
		path: 'club',
		component: ClubComponent,
	}
];
