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
		this.router.navigate(['/roster/overwatch']);
	}

	toMarvelRivals() {
		this.router.navigate(['/roster/marvel-rivals']);
	}

}
