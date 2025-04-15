import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'peps-footer',
	imports: [
		RouterLink,
		TranslatePipe
	],
  templateUrl: './footer.component.html',
})
export class FooterComponent {

}
