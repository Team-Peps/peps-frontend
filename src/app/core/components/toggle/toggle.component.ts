import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'peps-toggle',
	imports: [
		NgClass,
		NgStyle
	],
  templateUrl: './toggle.component.html',
})
export class ToggleComponent {
	@Input() checked: boolean = false;
	@Output() checkedChange = new EventEmitter<boolean>();

	toggle() {
		this.checked = !this.checked;
		this.checkedChange.emit(this.checked);
	}
}
