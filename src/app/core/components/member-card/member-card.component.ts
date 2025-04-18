import {Component, Input} from '@angular/core';
import {environment} from '@/environments/environment';
import {determineRoleIcon} from '../../utils/memberUtils';
import {MemberRole} from '../../../models/member/memberRole';
import {RouterLink} from '@angular/router';
import {MemberTiny} from '../../../models/member/memberTiny';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'peps-member-card',
	imports: [
		RouterLink,
		TranslatePipe
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
