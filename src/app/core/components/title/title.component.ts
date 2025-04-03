import {Component, Input} from '@angular/core';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'peps-title',
	imports: [
		UpperCasePipe
	],
  templateUrl: './title.component.html',
})
export class TitleComponent {

	@Input() title: string = '';
	@Input() subtitle: string = '';

}
