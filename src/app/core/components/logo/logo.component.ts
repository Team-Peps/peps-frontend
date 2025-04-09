import {Component, Input} from '@angular/core';
import {NgClass, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'peps-logo',
	imports: [
		NgOptimizedImage,
		NgClass
	],
  templateUrl: './logo.component.html',
})
export class LogoComponent {

	@Input() width: number = 41;
	@Input() height: number = 48;
	@Input() hover: boolean = true;
	@Input() onClick: any = () => {};
}
