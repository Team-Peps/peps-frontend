import {Component, Input} from '@angular/core';
import {environment} from '../../../../environment/environment';
import {determineRoleIcon} from '../../utils/memberUtils';
import {MemberRole} from '../../../models/member/memberRole';
import {RouterLink} from '@angular/router';
import {MemberTiny} from '../../../models/member/memberTiny';

@Component({
  selector: 'peps-member-card',
	imports: [
		RouterLink
	],
  templateUrl: './member-card.component.html',
	styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent {

	@Input() member: MemberTiny | null = null;

	minioBaseUrl = environment.minioBaseUrl;

	protected readonly determineRoleIcon = determineRoleIcon;
	protected readonly MemberRole = MemberRole;

}
