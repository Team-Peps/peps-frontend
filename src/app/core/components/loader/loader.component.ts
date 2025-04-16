import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
	selector: 'peps-loader',
	imports: [
		NgClass
	],
	templateUrl: './loader.component.html',
	styleUrl: './loader.component.css'
})
export class LoaderComponent {

	@Input() zIndex: number = 40;

}
