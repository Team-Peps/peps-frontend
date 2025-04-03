import {Component, Input} from '@angular/core';
import {NgClass, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'peps-button-small',
	imports: [
		UpperCasePipe,
		NgClass
	],
  templateUrl: './button-small.component.html',
})
export class ButtonSmallComponent {

	constructor() {}

	@Input() text: string = '';
	@Input() type: 'light' | 'dark' = 'light';
	@Input() onClick: any = () => {};

}
