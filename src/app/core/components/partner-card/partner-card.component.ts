import {Component, Input} from '@angular/core';
import {Partner} from '../../../models/partner';
import {environment} from '../../../../environment/environment';
import {ButtonSmallComponent} from '../buttons/button-small/button-small.component';
import {NgClass} from '@angular/common';
import {ToastService} from '../../../services/toast.service';

@Component({
  selector: 'peps-partner-card',
	imports: [
		ButtonSmallComponent,
		NgClass
	],
  templateUrl: './partner-card.component.html',
})
export class PartnerCardComponent {

	constructor(
		private readonly toastService: ToastService
	) {}

	@Input() partner: Partner | null = null;
	@Input() isEven: boolean = false;

	minioBaseUrl = environment.minioBaseUrl;

	copyToClipboard(code: string) {
		navigator.clipboard.writeText(code).then(() => {
			this.toastService.show(`Code ${code} copié !`, "success");
		}).catch(err => {
			this.toastService.show(`Le code n'a pas été copié !`, "error");
		});
	}
}
