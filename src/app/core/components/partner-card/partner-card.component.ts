import {Component, Input} from '@angular/core';
import {Partner} from '@models/partner';
import {environment} from '@/environments/environment';
import {ButtonSmallComponent} from '../buttons/button-small/button-small.component';
import {NgClass} from '@angular/common';
import {ToastService} from '@services/toast.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'peps-partner-card',
	imports: [
		ButtonSmallComponent,
		NgClass,
		TranslatePipe
	],
  templateUrl: './partner-card.component.html',
})
export class PartnerCardComponent {

	constructor(
		private readonly toastService: ToastService,
		private readonly translate: TranslateService,
	) {}

	@Input() partner: Partner | null = null;
	@Input() isEven: boolean = false;

	minioBaseUrl = environment.minioBaseUrl;

	copyToClipboard(code: string) {
		navigator.clipboard.writeText(code).then(() => {
			const successMessage = this.translate.instant('component.partner-card.clipboard.success', { code });
			this.toastService.show(successMessage, "success");
		}).catch(() => {
			const errorMessage = this.translate.instant('component.partner-card.clipboard.error');
			this.toastService.show(errorMessage, "error");
		});
	}
}
