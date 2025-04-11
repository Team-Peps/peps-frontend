import {Component, Input} from '@angular/core';
import {Ambassador} from '../../../models/ambassador';
import {environment} from '../../../../environment/environment';

@Component({
  selector: 'peps-ambassador-card',
  imports: [],
  templateUrl: './ambassador-card.component.html',
})
export class AmbassadorCardComponent {

	@Input() ambassador: Ambassador | null = null;

	minioBaseUrl = environment.minioBaseUrl;
}
