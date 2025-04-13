import {Component, Input} from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'peps-button',
	imports: [
		UpperCasePipe,
		RouterLink
	],
  templateUrl: './button.component.html',
})
export class ButtonComponent {

	@Input() text: string = '';
	@Input() link: string = '';
	@Input() hrefLink: string = '';

}
