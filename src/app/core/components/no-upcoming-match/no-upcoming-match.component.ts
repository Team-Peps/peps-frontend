import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'peps-no-upcoming-match',
	imports: [
		TranslatePipe
	],
  templateUrl: './no-upcoming-match.component.html',
})
export class NoUpcomingMatchComponent {

}
