import { Component } from '@angular/core';
import {LogoComponent} from '../logo/logo.component';

@Component({
  selector: 'peps-match-row',
	imports: [
		LogoComponent
	],
  templateUrl: './match-row.component.html',
})
export class MatchRowComponent {

	test() {
		console.log('test');
	}

}
