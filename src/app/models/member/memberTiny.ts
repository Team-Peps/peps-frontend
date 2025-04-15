import {MemberRole} from './memberRole';

export interface MemberTiny {
	id: string;
	pseudo: string;
	role: MemberRole;
	imageKey: string;
	isSubstitute: boolean;
}
