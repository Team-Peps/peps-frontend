import {Component, Input} from '@angular/core';
import {Achievement} from '../../../models/achievement';
import {NgClass} from '@angular/common';

@Component({
  selector: 'peps-achievement-row',
	imports: [
		NgClass
	],
  templateUrl: './achievement-row.component.html',
})
export class AchievementRowComponent {

	@Input() achievements: Achievement[] = [];

}
