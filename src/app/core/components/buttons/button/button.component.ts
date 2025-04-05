import {Component, Input} from '@angular/core';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'peps-button',
	imports: [
		UpperCasePipe
	],
  templateUrl: './button.component.html',
})
export class ButtonComponent {

	@Input() text: string = '';
	@Input() onClick: any = () => {};

}
