import {Component, OnInit} from '@angular/core';
import {MemberService} from '@services/member.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {SeparatorComponent} from '@components/separator/separator.component';
import {Game} from '@/app/models/game';
import {MemberCardComponent} from '@components/member-card/member-card.component';
import {AsyncPipe} from '@angular/common';
import {AchievementService} from '@services/achievement.service';
import {Achievement} from '@/app/models/achievement';
import {AchievementRowComponent} from '@components/achievement-row/achievement-row.component';
import {UpcomingMatchsComponent} from '@components/upcoming-matchs/upcoming-matchs.component';
import {MatchService} from '@services/match.service';
import {TitleComponent} from '@components/title/title.component';
import {Title} from '@angular/platform-browser';
import {MemberTiny} from '@/app/models/member/memberTiny';
import {MatchGroupByDate} from '@models/match/matchGroupByDate';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-roster-marvel-rivals',
	imports: [
		SeparatorComponent,
		MemberCardComponent,
		AsyncPipe,
		AchievementRowComponent,
		UpcomingMatchsComponent,
		TitleComponent,
		TranslatePipe
	],
  templateUrl: './roster-marvel-rivals.component.html',
})
export class RosterMarvelRivalsComponent implements OnInit {

	constructor(
		private readonly memberService: MemberService,
		private readonly achievementService: AchievementService,
		private readonly matchService: MatchService,
		private readonly titleService: Title,
	) { }

	private readonly membersSubject = new BehaviorSubject<MemberTiny[]>([]);
	private readonly coachesSubstitutesSubject = new BehaviorSubject<MemberTiny[]>([]);

	members$: Observable<MemberTiny[]> = this.membersSubject.asObservable();
	coachesSubstitutes$: Observable<MemberTiny[]> = this.coachesSubstitutesSubject.asObservable();

	achievements: Achievement[] = [];

	matches: MatchGroupByDate[] = [];

	ngOnInit(): void {
		this.titleService.setTitle('Team Peps - Marvel Rivals');
		this.loadMembers();
		this.loadAchievements();
		this.loadMatches();
	}

	loadMembers() {
		this.memberService.getActiveMembers(Game.MARVEL_RIVALS).subscribe({
			next: (members) => {
				this.membersSubject.next(members['members']);
				this.coachesSubstitutesSubject.next([
					...members['substitutes'],
					...members['coaches']
				]);
			},
			error: (error) => {
				console.error('Error fetching members:', error);
			}
		});
	}

	loadAchievements() {
		this.achievementService.getAllAchievementByGame(Game.MARVEL_RIVALS).subscribe({
			next: (achievements) => {
				this.achievements = achievements;
			},
			error: (error) => {
				console.error('Error fetching achievements:', error);
			}
		})
	}

	loadMatches() {
		this.matchService.getUpcomingMatchesByGame(Game.MARVEL_RIVALS).subscribe({
			next: (matches) => {
				this.matches = matches;
			},
			error: (error) => {
				console.error('Error fetching matches:', error);
			}
		})
	}
}
