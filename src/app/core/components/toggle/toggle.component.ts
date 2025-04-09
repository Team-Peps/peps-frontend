import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'peps-toggle',
	imports: [

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
