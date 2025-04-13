import {MemberRole} from '../../models/member/memberRole';

export function determineRoleIcon(role: MemberRole): string {
	switch (role) {
		case MemberRole.DAMAGE:
			return '/assets/icons/roles/damage.svg';
		case MemberRole.TANK:
			return 'assets/icons/roles/tank.svg';
		case MemberRole.SUPPORT:
			return 'assets/icons/roles/support.svg';
		case MemberRole.DUELIST:
			return 'assets/icons/roles/duelist.svg';
		case MemberRole.STRATEGIST:
			return 'assets/icons/roles/strategist.svg';
		case MemberRole.VANGUARD:
			return 'assets/icons/roles/vanguard.svg';
		default:
			return '';
	}
}
