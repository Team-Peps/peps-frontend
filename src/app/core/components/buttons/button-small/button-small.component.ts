import {Component, Input} from '@angular/core';
import {NgClass, UpperCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'peps-button-small',
	imports: [
		UpperCasePipe,
		NgClass,
		RouterLink
	],
  templateUrl: './button-small.component.html',
})
export class ButtonSmallComponent {

	constructor() {}

	@Input() text: string = '';
	@Input() link: string = '';
	@Input() type: 'light' | 'dark' = 'light';

}
