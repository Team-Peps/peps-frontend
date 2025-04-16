import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {LoginSuccessComponent} from './pages/login-success/login-success.component';
import {NewsComponent} from './pages/news/news.component';
import {NewsDetailsComponent} from './pages/news-details/news-details.component';
import {AmbassadorsComponent} from './pages/ambassadors/ambassadors.component';
import {PartnersComponent} from './pages/partners/partners.component';
import {MatchsComponent} from './pages/matchs/matchs.component';
import {ClubComponent} from './pages/club/club.component';
import {RosterOverwatchComponent} from './pages/rosters/roster-overwatch/roster-overwatch.component';
import {RosterMarvelRivalsComponent} from './pages/rosters/roster-marvel-rivals/roster-marvel-rivals.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {MemberDetailsComponent} from './pages/member-details/member-details.component';
import {NotAuthenticatedGuard} from './core/guard/not-authentication.guard';
import {AuthenticatedGuard} from './core/guard/authenticated.guard';

export const routes: Routes = [
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
		path: 'player/:memberId',
		component: MemberDetailsComponent
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
	},
	{
		path: 'login-success',
		component: LoginSuccessComponent,
		canActivate: [NotAuthenticatedGuard],
	},
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [AuthenticatedGuard],
	},
	{
		path: '**',
		redirectTo: 'not-found',
	},
	{
		path: 'not-found',
		component: NotFoundComponent,
	},
];
