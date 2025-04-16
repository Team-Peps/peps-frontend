import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'peps-headband-twitch',
	imports: [
		TranslatePipe
	],
  templateUrl: './headband-twitch.component.html',
})
export class HeadbandTwitchComponent {

	@Input() link: string = '';
	@Output() closeHeadband: EventEmitter<boolean> = new EventEmitter<boolean>();
	isShown = true;

	close() {
		this.isShown = false;
	}
}
