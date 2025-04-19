import {Component, Input} from '@angular/core';
import {Achievement} from '@models/achievement';
import {NgClass} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'peps-achievement-row',
	imports: [
		NgClass,
		TranslatePipe
	],
  templateUrl: './achievement-row.component.html',
})
export class AchievementRowComponent {

	@Input() achievements: Achievement[] = [];
	@Input() type: 'member' | 'team' = 'team';

}
