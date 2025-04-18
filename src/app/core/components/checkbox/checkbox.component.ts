import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
	selector: 'peps-checkbox',
	imports: [
		NgOptimizedImage
	],
	templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {

	@Input() checked: boolean = false;
	@Input() image: string = '';
	@Input() alt: string = '';

	@Output() onCheckChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	toggleCheck() {
		this.onCheckChange.emit(!this.checked);
	}

}
