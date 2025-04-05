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
	@Input() imageAlt: string = '';
	@Output() onCheckChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	toggleCheck() {
		this.checked = !this.checked;
		this.onCheckChange.emit(this.checked);
	}

}
