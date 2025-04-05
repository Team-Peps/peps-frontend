import {Component, Input} from '@angular/core';

@Component({
  selector: 'peps-max-button',
  imports: [],
  templateUrl: './max-button.component.html',
})
export class MaxButtonComponent {

	@Input() onClickOverwatch: any = () => {};
	@Input() onClickMarvelRivals: any = () => {};

}
