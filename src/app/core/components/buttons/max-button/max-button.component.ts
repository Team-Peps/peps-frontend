import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'peps-max-button',
  imports: [],
  templateUrl: './max-button.component.html',
})
export class MaxButtonComponent {

	constructor(
		private readonly router: Router,
	) {}

	toOverwatch() {
		this.router.navigate(['/rosters/overwatch']);
	}

	toMarvelRivals() {
		this.router.navigate(['/rosters/marvel-rivals']);
	}

}
