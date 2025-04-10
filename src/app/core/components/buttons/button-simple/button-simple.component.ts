import {Component, Input} from '@angular/core';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'peps-button-simple',
	imports: [
		UpperCasePipe
	],
  templateUrl: './button-simple.component.html',
})
export class ButtonSimpleComponent {

	constructor() {}

	@Input() text: string = '';

}
