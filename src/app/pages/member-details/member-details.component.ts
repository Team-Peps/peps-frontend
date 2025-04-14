import {Component, OnInit} from '@angular/core';
import {MemberService} from '../../services/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Member} from '../../models/member/member';
import {environment} from '../../../environment/environment';
import {TitleComponent} from '../../core/components/title/title.component';
import {NgStyle} from '@angular/common';
import {determineRoleIcon} from '../../core/utils/memberUtils';
import {AchievementRowComponent} from '../../core/components/achievement-row/achievement-row.component';
import {MemberCardComponent} from '../../core/components/member-card/member-card.component';
import {LoaderComponent} from '../../core/components/loader/loader.component';
import {Title} from '@angular/platform-browser';

@Component({
	selector: 'app-member-details',
	imports: [
		NgStyle,
		AchievementRowComponent,
		TitleComponent,
		MemberCardComponent,
		LoaderComponent
	],
	templateUrl: './member-details.component.html',
	styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

	constructor(
		private readonly memberService: MemberService,
		private readonly activateRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly titleService: Title,
	) {}

	protected readonly determineRoleIcon = determineRoleIcon;

	member: Member | null = null;
	minioBaseUrl = environment.minioBaseUrl;

	members: Member[] = [];

	ngOnInit(): void {
		const id = this.activateRoute.snapshot.paramMap.get('memberId')!;
		this.loadMember(id);
    }

	loadMember(memberId: string): void {
		this.memberService.getMemberById(memberId).subscribe({
			next: (member) => {
				this.member = member;
				this.titleService.setTitle('Team Peps - ' + member.pseudo.toString());
				this.loadRoster();
			},
			error: (error) => {
				console.error('Error fetching member details:', error);
				this.router.navigate(['/not-found']);
			}
		})
	}

	loadRoster(): void {
		this.memberService.getMembers(this.member!.game).subscribe({
			next: (members) => {
				this.members = [...members['members'], ...members['substitutes'], ...members['coaches']];
			},
			error: (error) => {
				console.error('Error fetching roster:', error);
			}
		})
	}

}
