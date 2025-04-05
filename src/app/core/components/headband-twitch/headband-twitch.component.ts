import {Component, Input} from '@angular/core';

@Component({
  selector: 'peps-headband-twitch',
  imports: [],
  templateUrl: './headband-twitch.component.html',
})
export class HeadbandTwitchComponent {

	@Input() link: string = '';
	isShown = true;

	close() {
		this.isShown = false;
	}
}
